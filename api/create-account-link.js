const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { account_id } = req.body;
    const accountLink = await stripe.accountLinks.create({
      account: account_id,
      use_case: {
        type: 'account_onboarding',
        account_onboarding: {
          configurations: ['merchant', 'customer'],
          refresh_url: 'https://dashboard.stripe.com/workbench/blueprints/learn-accounts-v2/create-account-chapter?confirmation-redirect=create-account-link',
          return_url: 'https://dashboard.stripe.com/workbench/blueprints/learn-accounts-v2/create-account-chapter?confirmation-redirect=create-account-link',
        },
      },
    });

    res.status(200).json({ url: accountLink.url });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};
