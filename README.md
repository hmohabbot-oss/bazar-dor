# Bazar Dor — Assignment 07

**Bazar Dor** is a Bengali-language web application for exploring daily prices of essential commodities. It presents price movements, category-based product listings, and market-level price details in a responsive interface.

| Submission link | URL |
| --- | --- |
| Live application | [https://bazar-dor-fq4h.vercel.app](https://bazar-dor-fq4h.vercel.app) |
| Source code | [GitHub repository](https://github.com/hmohabbot-oss/bazar-dor) |

## Project overview

The application helps users review current commodity prices and compare available market data. The home page highlights products whose prices have increased or decreased, followed by the complete product catalogue. Users can browse categories, sort products by price, and open a product page for more detailed market information.

The interface and authentication pages are presented in Bengali. Email and password authentication is supported alongside Google and GitHub sign-in.

## Implemented features

- Home page sections for products with rising and falling prices
- Product catalogue with category-based browsing
- Category listing with low-to-high and high-to-low price sorting
- Product details with available market-level minimum and maximum prices
- Bengali labels and Bengali number formatting
- Responsive layout for desktop and mobile screens
- Email and password sign-up/sign-in
- Google and GitHub OAuth sign-in
- Session and authentication data stored in MongoDB through Better Auth

## Technology stack

- **Framework:** Next.js 16 App Router
- **UI:** React 19, TypeScript, Tailwind CSS 4
- **Authentication:** Better Auth with the MongoDB adapter
- **Database:** MongoDB
- **Product data:** Bazar Dor products API (`api.api-store.workers.dev`)
- **Hosting:** Vercel

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Price movements and full product catalogue |
| `/category/[slug]` | Products in a category, with price sorting |
| `/product/[id]` | Product and market-level price details |
| `/signup` | Create an account |
| `/signin` | Sign in to an account |
| `/api/auth/[...all]` | Better Auth API endpoints |

## Data and authentication flow

Product and market-price information is requested from the Bazar Dor products API. The home page fetches the product catalogue on the server; the API response is revalidated periodically. Category pages request their category's products from the same API.

Better Auth handles email/password and OAuth authentication. MongoDB stores authentication records and sessions. Google and GitHub OAuth credentials are configured separately in their provider consoles and supplied to the application through environment variables.

## Run locally

### Requirements

- Node.js and npm
- A MongoDB connection string
- Google and/or GitHub OAuth credentials if testing social sign-in locally

### Install dependencies

```bash
git clone https://github.com/hmohabbot-oss/bazar-dor.git
cd bazar-dor
npm install
```

### Configure environment variables

Create `.env.local` in the project root:

```env
MONGODB_URI="<mongodb-connection-string>"
BETTER_AUTH_SECRET="<long-random-secret>"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: configure both values to enable Google sign-in
GOOGLE_CLIENT_ID="<google-oauth-client-id>"
GOOGLE_CLIENT_SECRET="<google-oauth-client-secret>"

# Optional: configure both values to enable GitHub sign-in
GITHUB_CLIENT_ID="<github-oauth-client-id>"
GITHUB_CLIENT_SECRET="<github-oauth-client-secret>"
```

`MONGODB_URI`, `BETTER_AUTH_SECRET`, and the two application URL variables are required. OAuth variables are optional; each provider requires its matching Client ID and Client Secret. Generate a random authentication secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Keep `.env.local` and all provider secrets out of source control. The `.env.local` file is for local development; use the actual deployment domain for the URL variables in Vercel.

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## OAuth callback configuration

The production OAuth applications must allow the deployed domain and callback endpoints below. If the Vercel domain changes, update the provider settings and the application URL environment variables to match.

### Google OAuth client

In Google Cloud Console, under **APIs & Services → Credentials**, configure the Web application client used by this project:

- **Authorized JavaScript origin:** `https://bazar-dor-fq4h.vercel.app`
- **Authorized redirect URI:** `https://bazar-dor-fq4h.vercel.app/api/auth/callback/google`

### GitHub OAuth App

In GitHub **Settings → Developer settings → OAuth Apps**, configure:

- **Homepage URL:** `https://bazar-dor-fq4h.vercel.app`
- **Authorization callback URL:** `https://bazar-dor-fq4h.vercel.app/api/auth/callback/github`

## Deployment

The application is deployed on Vercel and connected to its GitHub repository. Configure the required environment variables for the Production environment before deploying. Include OAuth Client ID/Secret pairs to enable the corresponding providers. `NEXT_PUBLIC_APP_URL` is a public configuration value; `BETTER_AUTH_SECRET` and OAuth Client Secrets must remain private.

After changing environment variables, create a new deployment so the running application receives the updated configuration. MongoDB Atlas must allow the deployed application to connect to the database.

## Project structure

```text
src/
├── app/
│   ├── (auth)/             # Sign-in and sign-up pages
│   ├── api/auth/           # Better Auth route handler
│   ├── category/[slug]/    # Category product listing
│   ├── product/[id]/       # Product details
│   └── page.tsx            # Home page
├── components/
│   ├── auth/               # Shared social sign-in buttons
│   ├── home/               # Home page sections
│   ├── layout/             # Navigation, ticker, and footer
│   └── product/            # Product cards
└── lib/                    # API, authentication, database, and utilities
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |
