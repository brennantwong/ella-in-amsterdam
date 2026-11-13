export function formatMoney(amount) {
  const value = Number.isFinite(amount) ? amount : 0;
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}