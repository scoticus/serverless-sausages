# Serverless Sausages

Here we have a client-side only ecommerce store with payments handled by Stripe.

The aim of this project was to create an online store as quickly and easily as possible that still had low operating costs. Keeping everything simple was important and less concern was given to ongoing maintenance and growth.

Products are hard coded into the [`productsList.js`](https://github.com/scoticus/serverless-sausages/blob/main/data/productList.js) file and are also "hard coded" in the Stripe dashboard. We simply need to tell Stripe which products to bill for and they take care of the rest. We can use the Stripe dashboard to see if an order has been placed and then fulfil it, upgrade an account, or whatever takes your fancy...

Stripe Checkout works with webhooks too, so if you want to add some post-sale logic at a later date the world is your oyster.

This setup is best suited to incredibly small outfits with only a handful of products and orders. With that being said, this repo could be used to get a fully functioning online store up and running in the time it takes to finish a coffee, as long as you are happy with the base styling (you won't be 🙈 ). Also, if you host it somewhere like [Netlify](https://www.netlify.com) (Vercel doesn't allow commercial projects on their free plan) then your only operating cost will be Stripe's processing fee.

## Tooling

| Tool                                                       | Purpose                         |
| :--------------------------------------------------------- | :------------------------------ |
| Next.js                                                    | Base platform                   |
| CSS Modules                                                | Styling                         |
| [React-use-cart](https://github.com/notrab/react-use-cart) | Hooks for shopping cart state   |
| Stripe Checkout                                            | Serverless handling of payments |

## Getting Started

Run the following commands in a terminal to get the site going:

```shell
git clone https://github.com/scoticus/serverless-sausages.git
cd serverless-sausages
yarn
yarn dev
```

You will also need to setup your Stripe account before being able to head to the checkout.

- Navigate to the `Products` area of the Dashboard.
- Add a product, giving it identical data to what you have in the `productList.js` file.
- Save then copy the product's `API ID` (it will begin with `price_`)
- Paste the `API ID` from Stripe, into the Stripe ID row of the respective product in the `productList.js` file.
- Copy your `Publishable key` from the Developers > API keys area of the dashboard (it will begin `pk_test_`).
- Set the publishable key as the environment variable `NEXT_PUBLIC_STRIPE_API_KEY` on your hosting platform or a `.env.local` file.

You should now be ready to checkout. Make sure to clear any items in your cart as they may have out of date data and then try to checkout. You can use the [test card info](https://stripe.com/docs/payments/accept-a-payment#additional-testing) from Stripe to simulate a payment.

If it's worked then you will see a transaction row in the Payments area of your Stripe dashboard (you may need to toggle "Viewing test data" on the sidebar).

## Gotchas

- You explicitly need to allow your Stripe account to accept client-side only payments. Do this in the `Checkout settings` area of your Stripe settings.
- If the `stripeId` for the product in `productList.js` doesn't match a product you have setup on your Stripe account, Stripe won't know what to charge your customer.
- This repo example only allows customers to checkout from the UK or Ireland. You can change this setting in the [cart.js](https://github.com/scoticus/serverless-sausages/blob/main/pages/cart.js) file (line 33).
- Vercel (maker of Next.js) does not permit commercial projects to be run on their "Hobby" plan.

---

## The Stripe Checkout Product List

Stripe expects Checkout to be passed an array of items in the following format:

```JavaScript
const cartContents = [
  {
    price: 'price_1Hhy98VQx0zOgsketyIx7q0B',
    quantity: 2,
  },
  {
    price: 'price_1HedGuFGp8zOkftmQJHSuxYa',
    quantity: 1,
  },
];
```

The price key here refers to the `API ID` Stripe gave the product when we added it via the dashboard. The [StripeJS docs](https://stripe.com/docs/js/checkout/redirect_to_checkout) explain in further detail.

Unfortunately for us, the react-use-cart hooks also makes use of the price key to store the monetary price of items. So, before submitting our cart to Stripe we need to format the array into the shape Stripe wants. I've used Lodash cloneDeep to do this as it means we don't mess with the data stored in state and localStorage set by react-use-cart. See [`pages/cart.js`](https://github.com/scoticus/serverless-sausages/blob/main/pages/cart.js) for more info.
