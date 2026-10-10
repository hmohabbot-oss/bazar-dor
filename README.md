# Bazar Dor — Assignment 07

Bazar Dor is a Bengali-language web app for checking everyday commodity prices. It brings category browsing, daily price movement, and market-level comparisons together in one place.

## Project links

- **Live app:** [bazar-dor-fq4h.vercel.app](https://bazar-dor-fq4h.vercel.app/)
- **GitHub:** [hmohabbot-oss/bazar-dor](https://github.com/hmohabbot-oss/bazar-dor)
- **Price data API:** [api.abcz.workers.dev/api/bazardor](https://api.abcz.workers.dev/api/bazardor)

## What the app does

- Shows the full product list and highlights products whose prices went up or down.
- Lets visitors browse products by category and sort a category by price.
- Displays each product's current price, change direction and percentage, and available market prices.
- Provides a Bengali interface with responsive layouts and Bengali number formatting.
- Supports email/password accounts and optional Google and GitHub sign-in.
- Keeps authentication users and sessions in MongoDB through Better Auth.

## Technology

| Area | Tools |
| --- | --- |
| Web framework | Next.js 16 App Router |
| UI and language | React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Authentication | Better Auth, MongoDB adapter |
| Database | MongoDB |
| Product data | Bazar Dor API |
| Hosting | Vercel |

## Pages

| URL | What it contains |
| --- | --- |
| `/` | Daily price movement, category navigation, and all products |
| `/category/[slug]` | Products in one category and price sorting |
| `/product/[id]` | Product price movement and market-level details |
| `/signup` | Email or social account creation |
| `/signin` | Email or social sign-in |
| `/profile` | Signed-in user's profile |
| `/profile/update` | Profile editing |
| `/api/auth/[...all]` | Better Auth API handler |

## Data flow

Product and category information comes from `https://api.abcz.workers.dev/api/bazardor`. The home page requests all products; category pages request products with the `category` query parameter; product pages request one product by ID. Authentication data is stored separately in MongoDB.

## Run the project locally

### Requirements

- Node.js and npm
- A MongoDB database and connection URI
- OAuth app credentials if you want to try Google or GitHub sign-in locally

### Install

```bash
git clone https://github.com/hmohabbot-oss/bazar-dor.git
cd bazar-dor
npm install
```

### Add local environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=<your-mongodb-connection-string>
BETTER_AUTH_SECRET=<your-long-random-secret>
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: add both values to enable Google sign-in
GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>

# Optional: add both values to enable GitHub sign-in
GITHUB_CLIENT_ID=<github-oauth-client-id>
GITHUB_CLIENT_SECRET=<github-oauth-client-secret>
```

Generate a random `BETTER_AUTH_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Keep `.env.local` and all secrets private. Never commit them to GitHub. In Vercel, set the URL variables to the production domain. OAuth values can be omitted when only email/password authentication is needed.

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## OAuth callback URLs

Use the same domain configured in the app's production environment variables.

**Google Cloud Console** — create or edit a Web OAuth client:

- Authorized JavaScript origin: `https://bazar-dor-fq4h.vercel.app`
- Authorized redirect URI: `https://bazar-dor-fq4h.vercel.app/api/auth/callback/google`

**GitHub OAuth App** — under **Settings → Developer settings → OAuth Apps**:

- Homepage URL: `https://bazar-dor-fq4h.vercel.app`
- Authorization callback URL: `https://bazar-dor-fq4h.vercel.app/api/auth/callback/github`

If the production domain changes, update these provider settings and the Vercel URL variables to match.

## Deploy on Vercel

The GitHub repository is connected to Vercel. Push changes to the configured production branch to start a deployment. Add the required environment variables in **Project Settings → Environment Variables** and make sure the MongoDB deployment allows connections from the app. A change to environment variables requires a new deployment before the running app can use it.

## React concepts used in this project

### 1. Why use JSX?

JSX describes the page structure inside React components. For example, `ProductCard` combines a product name, price, and price-change badge in one reusable component instead of repeating that markup for every item.

### 2. How are props and state different?

Props carry data into a component. `ProductCard` receives a `product` prop from the page that renders it. State is data that can change while a component is being used; the category page stores the selected sorting option as state.

### 3. Where does `useState` help here?

The category page uses `useState` to keep the selected sort order and the fetched product list. When either changes, React renders the updated list.

### 4. What does `useEffect` do in the category flow?

`useEffect` runs browser-side work after the page renders. The category page uses it to load the API's category and product data when its slug changes.

### 5. Why does a mapped product need a `key`?

A stable key lets React associate each rendered card with its product when the list changes. Product cards use the API's product ID as their key.

### 6. Where is conditional rendering used?

The home page only renders the “price increased” and “price decreased” sections when each group has products. Category pages also show loading, empty, or product-grid content according to the current state.

### 7. How does information move between components?

Pages fetch or prepare product data and pass each product to `ProductCard` through props. In the category page, a change to the sort selector updates state; React then renders the products in the selected order.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Serve a production build locally |
