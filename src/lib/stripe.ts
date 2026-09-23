import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_dummy_key_for_development';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20' as any,
  appInfo: {
    name: 'Adoptd Christian Clothing',
    version: '1.0.0',
  },
});
