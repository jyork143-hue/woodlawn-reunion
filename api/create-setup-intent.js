const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { account_id } = req.body;
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ['stripe_balance'],
      confirm: true,
      customer_account: account_id,
      usage: 'off_session',
      payment_method_data: {
        type: 'stripe_balance',
      },
    });

    res.status(200).json({ payment_method: setupIntent.payment_method });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};
