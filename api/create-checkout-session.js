const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { account_id } = req.body;
    const session = await stripe.checkout.sessions.create(
      {
        success_url: 'https://dashboard.stripe.com/workbench/blueprints/learn-accounts-v2/accept-embedded-payments-chapter?confirmation-redirect=create-checkout-session',
        line_items: [
          {
            price_data: {
              currency: process.env.CURRENCY || 'usd',
              product_data: {
                name: 'Cookie',
              },
              unit_amount: 100000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        payment_method_types: ['card'],
        payment_intent_data: {
          application_fee_amount: 123,
        },
      },
      {
        stripeAccount: account_id,
      }
    );

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};
