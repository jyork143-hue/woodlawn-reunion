const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const product = await stripe.products.create({
      name: 'Platform subscription',
      default_price_data: {
        currency: process.env.CURRENCY || 'usd',
        recurring: {
          interval: 'month',
        },
        unit_amount: 1000,
      },
    });

    res.status(200).json({ default_price: product.default_price });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};
