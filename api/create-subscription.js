const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { account_id, default_price, payment_method } = req.body;
    const subscription = await stripe.subscriptions.create({
      customer_account: account_id,
      default_payment_method: payment_method,
      items: [
        {
          price: default_price,
          quantity: 1,
        },
      ],
      payment_settings: {
        payment_method_types: ['stripe_balance'],
      },
    });

    res.status(200).json({ subscription_id: subscription.id });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};
