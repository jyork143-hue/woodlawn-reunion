require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
app.use(cors());
app.use(express.json());

// Do not pass API version as instructed in blueprint
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ----------------------------------------------------------------------------
// Chapter: Subscriptions and embedded payments
// ----------------------------------------------------------------------------

// Node: create-account
app.post('/create-account', async (req, res) => {
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

    res.json({ account_id: account.id });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// Node: create-account-link
app.post('/create-account-link', async (req, res) => {
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

    res.json({ url: accountLink.url });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// Node: create-checkout-session
app.post('/create-checkout-session', async (req, res) => {
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

    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// Node: create-product
app.post('/create-product', async (req, res) => {
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

    res.json({ default_price: product.default_price });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// Node: create-setup-intent
app.post('/create-setup-intent', async (req, res) => {
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

    res.json({ payment_method: setupIntent.payment_method });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// Node: create-subscription
app.post('/create-subscription', async (req, res) => {
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

    res.json({ subscription_id: subscription.id });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Stripe backend listening on port ${PORT}`);
});
