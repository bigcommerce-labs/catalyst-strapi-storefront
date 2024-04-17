<h1>
<p align="center">
<img src="https://storage.googleapis.com/bigcommerce-developers/images/bigc-dev-round-icon.png" alt="BigCommerce" title="BigCommerce" height="40">  <sup><strong>&nbsp;&nbsp;&nbsp; ﹢ &nbsp;&nbsp;&nbsp;</strong></sup>  <img src="https://storage.googleapis.com/bigcommerce-developers/images/strapi/Strapi.monogram.logo.png" alt="Strapi" title="Strapi" height="40">
</p>
</h1>

# Catalyst + Strapi <br><sub>Storefront Integration</sub>

Integrate BigCommerce's Catalyst storefront with Strapi, to have it manage the built-in blog's content and power a new customer service section. Both with support for i18n, so you can localize the content per locale. Demo data for _en_ and _es_ locales is provided.

This repo houses the Catalyst app. Which renders the storefront using BigCommerce's GraphQL APIs and includes the frontend for the blog and customer service sections of the site.

To run the associated Strapi app you'll want to head to: https://github.com/bigcommerce-labs/catalyst-strapi-backend

## Demo site

For a working demo of this Strapi integration with Catalyst, see the following example:

```shell copy
https://catalyst-with-strapi.vercel.app/blog
```

```shell copy
https://catalyst-with-strapi.vercel.app/customer-service
```

## Prerequisites

To follow this guide, you need the following:

- Node.js 18+
- Your favorite Node.js package manager, such as `npm`, `pnpm`, or `yarn` _(these instructions use `npm`)_
- Working knowledge of [Next.js](https://nextjs.org)
- A [BigCommerce store](https://www.bigcommerce.com/start-your-trial/) or [sandbox store](https://start.bigcommerce.com/developer-sandbox/)
- A Strapi instance with the associated Blog and Customer Service content models

> [!IMPORTANT]
> We recommend setting up the Strapi instance _first_ since you'll need API credentials as part of this project's .env variables: https://github.com/bigcommerce-labs/catalyst-strapi-backend

## Integration overview

The integration into Strapi is comprised of only a few extra directories and files. This repo contains both those files and the core Catalyst reference storefront app, so you easily try it from one place. It makes the deploy process easier.

_If you already have a Catalyst storefront project, these files can be copy pasted directly into it!_

Either route requires you to set up the separate Strapi repo so you have the associated models and Strapi API running.

**Key integration directories:**
```shell
...
├── app
    └── [locale]
        └──
            (default)
                ...
                └── blog
                    # The blog directory has minor changes (just a few lines) to utilize Strapi instead of BigCommerce's blog API. The data fetcher inside the integrations folder and Strapi's blocks-react-renderer does most of the work. This replaces the default blog directory if you are copy pasting into an existing Catalyst project.
                ...
                └── customer-service
                    # The customer-service directory is a new route, not within the default Catalyst storefront route set. It contains a landing page that lists all the question categories and a route that lists answers to questions in that category.
├── integrations/
    └── strapi
        # Contains the Strapi API fetch functions for blog, customer service, and global site content. Error handling and transformation of Strapi's API response into what fits better with existing Catalyst components (like those in the blog) happens here. There is a client component wrapper for blocks-react-renderer as well, since that library doesn't have native RSC support yet.
```

## Quick start

Use our Vercel integration to create or link a BigCommerce account to this repo.

It will automatically set the Bigcommerce specific env variables for you.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbigcommerce-labs%2Fcatalyst-strapi-storefront&env=STRAPI_BASE_URL,STRAPI_API_KEY&envDescription=Use%20the%20linked%20Strapi%20repo%20to%20get%20these%20env%20vars%20and%20the%20right%20data%20models%20set%20up.&envLink=https%3A%2F%2Fgithub.com%2Fbigcommerce-labs%2Fcatalyst-strapi-backend%3Ftab%3Dreadme-ov-file%23------&repository-name=catalyst-strapi-storefront&demo-title=Catalyst%20%2B%20Strapi&demo-description=BigCommerce's%20Catalyst%20storefront%20pre-integrated%20with%20Strapi.&demo-url=https%3A%2F%2Fcatalyst-with-strapi.vercel.app&demo-image=https%3A%2F%2Fstorage.googleapis.com%2Fbigcommerce-developers%2Fimages%2FSocial-image-Catalyst.png&integration-ids=oac_nsrwzogJLEFglVwt2060kB0y&external-id=catalyst)

## Setup

1. Clone this repo:

```shell copy
git clone https://github.com/bigcommerce-labs/catalyst-strapi-storefront.git
```

2. Install dependences:

```shell copy
npm install
```

3. Copy the sample .env file so you can edit your local environment variables:

```shell copy
cp .env.example .env.local
```

4. Follow comments in the .env file to enter the required values: `BIGCOMMERCE_STORE_HASH`, `BIGCOMMERCE_ACCESS_TOKEN`, `BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN`, and `AUTH_SECRET`. Read through [docs on Catalyst environment variables](https://www.catalyst.dev/docs/environment-variables) to learn more.

5. Copy over the `STRAPI_BASE_URL` and `STRAPI_API_KEY` values from your Strapi instance. If running locally, you probably only need to change the `STRAPI_API_KEY` value.

6. Start Catalyst:

```shell copy
npm run dev
```

7. Head to these pages to see the Strapi integration in action:

- http://localhost:3000/blog/
- http://localhost:3000/customer-service/

> [!TIP]
> Don't see anything there? Keep in mind you need to be running Strapi at the same time as well.

## Resources

- [Catalyst core docs](https://www.catalyst.dev/docs)
- [Strapi docs](https://docs.strapi.io/)
