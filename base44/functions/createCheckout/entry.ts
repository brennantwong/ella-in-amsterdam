import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { PAPERBACKS } from '../../shared/paperbacks.ts';

export default async function (req) {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length < 1 || items.length > 20) {
      return Response.json({ error: 'Cart must contain between 1 and 20 titles' }, { status: 400 });
    }

    const lineItems = [];
    const seen = new Set();

    for (const item of items) {
      const book = PAPERBACKS[String(item && item.id ? item.id : '')];
      if (!book) {
        return Response.json({ error: 'Unknown title in cart' }, { status: 400 });
      }
      if (seen.has(String(item.id))) {
        return Response.json({ error: 'Duplicate title in cart' }, { status: 400 });
      }
      seen.add(String(item.id));

      const quantity = Number(item.qty);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        return Response.json({ error: 'Invalid quantity' }, { status: 400 });
      }

      lineItems.push({ name: book.name, amount: book.amount, quantity });
    }

    const checkout = await base44.asServiceRole.payments.createCheckout({
      items: lineItems,
      currency: 'usd',
      success_path: '/order-confirmed',
    });

    if (!checkout || !checkout.redirect_url) {
      return Response.json({ error: 'Checkout could not be created' }, { status: 502 });
    }

    return Response.json({ url: checkout.redirect_url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}