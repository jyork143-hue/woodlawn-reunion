const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const account = await stripe.accounts.create({
      display_name: 'Test account',
      contact_email: 'testaccount@example.com',
      configuration: {
        merchant: {
          simulate_accept_tos_obo: true,
        },
      },
      include: [
        'configuration.merchant',
        'configuration.recipient',
        'identity',
        'defaults',
        'configuration.customer',
      ],
      identity: {
        country: process.env.CONNECTED_ACCOUNT_COUNTRY || 'US',
        business_details: {
          phone: '0000000000',
        },
      },
      dashboard: 'full',
      defaults: {
        responsibilities: {
          losses_collector: 'stripe',
          fees_collector: 'stripe',
        },
      },
    });

    res.status(200).json({ account_id: account.id });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};
