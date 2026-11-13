import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { books } from '@/data/books';

const STORAGE_KEY = 'ella-cart-v1';
const CartContext = createContext(null);

const clampQty = (qty) => Math.min(99, Math.max(1, Math.round(Number(qty) || 1)));

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => books.some((b) => b.id === item.id) && Number(item.qty) > 0)
      .map((item) => ({ id: item.id, qty: clampQty(item.qty) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStored);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (id, qty = 1) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: clampQty(i.qty + Number(qty)) } : i));
      }
      return [...prev, { id, qty: clampQty(qty) }];
    });

  const buyNow = (id, qty = 1) => setItems([{ id, qty: clampQty(qty) }]);

  const setQty = (id, qty) =>
    setItems((prev) =>
      Number(qty) <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: clampQty(qty) } : i)),
    );

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const book = books.find((b) => b.id === item.id);
          return book ? { ...book, qty: item.qty } : null;
        })
        .filter(Boolean),
    [items],
  );

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.qty * (line.price || 0), 0);

  const value = { items, lines, count, subtotal, add, buyNow, setQty, remove, clear };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}