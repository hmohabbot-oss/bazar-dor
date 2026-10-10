# বাজার দর

নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে দেখার ও পণ্যভিত্তিক দাম তুলনা করার ওয়েব অ্যাপ। ব্যবহারকারীরা পণ্যের তালিকা, ক্যাটাগরি এবং বিস্তারিত বাজারদর দেখতে পারেন; অ্যাকাউন্ট তৈরি ও সাইন ইন করতে পারেন ইমেইল, Google অথবা GitHub দিয়ে।

**লাইভ সাইট:** [bazar-dor-fq4h.vercel.app](https://bazar-dor-fq4h.vercel.app)

## ফিচার

- আজ যেসব পণ্যের দাম বেড়েছে বা কমেছে সেগুলোর তালিকা
- ক্যাটাগরি অনুযায়ী পণ্য ব্রাউজ ও দামের ক্রমানুসারে সাজানো
- পণ্যের বিস্তারিত ও বাজারভিত্তিক দামের তুলনা
- Better Auth ও MongoDB দিয়ে ইমেইল/পাসওয়ার্ড authentication
- Google ও GitHub OAuth sign-in
- বাংলা interface এবং responsive layout
- Vercel-এ deployment ও GitHub থেকে স্বয়ংক্রিয় redeploy

## ব্যবহৃত প্রযুক্তি

- [Next.js](https://nextjs.org/) 16 (App Router) ও React 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Better Auth](https://www.better-auth.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/)

## লোকাল মেশিনে চালানো

### ১. Repository clone ও dependency install

```bash
git clone <your-github-repository-url>
cd bazar-dor
npm install
```

### ২. Environment variables তৈরি

Project root-এ `.env.local` ফাইল বানিয়ে নিচের variable-গুলো যোগ করুন:

```env
MONGODB_URI="<your-mongodb-connection-string>"
BETTER_AUTH_SECRET="<a-long-random-secret>"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google sign-in চালু করতে দুটোই দিন
GOOGLE_CLIENT_ID="<google-oauth-client-id>"
GOOGLE_CLIENT_SECRET="<google-oauth-client-secret>"

# GitHub sign-in চালু করতে দুটোই দিন
GITHUB_CLIENT_ID="<github-oauth-client-id>"
GITHUB_CLIENT_SECRET="<github-oauth-client-secret>"
```

`MONGODB_URI` ও `BETTER_AUTH_SECRET` আবশ্যক। Social sign-in ব্যবহার না করলে সংশ্লিষ্ট provider-এর দুইটি variable বাদ দিতে পারেন। OAuth চালু করলে Client ID ও Client Secret অবশ্যই একই OAuth application থেকে নেবেন।

`BETTER_AUTH_SECRET` তৈরি করতে Node.js থাকলে চালান:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

`.env.local` কখনো GitHub-এ commit করবেন না। `.env.local` ফাইলের variable-এ quotation mark ঐচ্ছিক; Vercel-এর Value field-এ মান বসানোর সময় quotation mark দেবেন না।

### ৩. Development server চালু

```bash
npm run dev
```

তারপর [http://localhost:3000](http://localhost:3000) খুলুন।

## OAuth callback configuration

Google ও GitHub sign-in কাজ করাতে provider-এর developer console-এ production domain এবং callback URL যোগ করতে হবে। নিচের URL-গুলো এই repository-এর বর্তমান live domain-এর জন্য। Domain বদলালে `bazar-dor-fq4h.vercel.app` অংশটি নতুন domain দিয়ে প্রতিস্থাপন করুন।

### Google

Google Cloud Console → **APIs & Services → Credentials** → ব্যবহৃত Web OAuth client:

- **Authorized JavaScript origin:** `https://bazar-dor-fq4h.vercel.app`
- **Authorized redirect URI:** `https://bazar-dor-fq4h.vercel.app/api/auth/callback/google`

### GitHub

GitHub → **Settings → Developer settings → OAuth Apps** → ব্যবহৃত OAuth App:

- **Homepage URL:** `https://bazar-dor-fq4h.vercel.app`
- **Authorization callback URL:** `https://bazar-dor-fq4h.vercel.app/api/auth/callback/github`

Local OAuth পরীক্ষা করতে provider-এ আলাদা local URL যোগ করুন: origin/homepage `http://localhost:3000` এবং callback `http://localhost:3000/api/auth/callback/google` বা `http://localhost:3000/api/auth/callback/github`।

## Vercel-এ deploy

1. GitHub repository Vercel-এ import করুন; Framework Preset `Next.js` এবং Root Directory `./` রাখুন।
2. Project-এর **Settings → Environment Variables**-এ `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL` যোগ করুন। OAuth ব্যবহারের জন্য provider-এর Client ID/Secret-ও যোগ করুন।
3. `BETTER_AUTH_URL` এবং `NEXT_PUBLIC_APP_URL`-এ Vercel-এর production domain দিন, যেমন `https://bazar-dor-fq4h.vercel.app`। `NEXT_PUBLIC_APP_URL`-এর Type `Config` রাখুন।
4. Environment-এ `Production` নির্বাচন করে **Deploy** করুন। Variable পরিবর্তনের পর নতুন deployment বা **Redeploy** লাগবে।
5. MongoDB Atlas ব্যবহার করলে Atlas-এর Network Access থেকে deployment-কে database-এ সংযোগের অনুমতি দিন।

GitHub-এর সংযুক্ত branch-এ নতুন commit push করলে Vercel সাধারণত স্বয়ংক্রিয়ভাবে নতুন deployment তৈরি করে।

## দরকারি command

```bash
npm run dev     # লোকাল development server
npm run lint    # ESLint
npm run build   # production build
npm run start   # production build লোকালি চালানো
```

## Project structure

```text
src/
├── app/                 # Next.js routes ও pages
│   ├── (auth)/          # Sign-in ও sign-up
│   ├── api/auth/        # Better Auth API route
│   ├── category/        # Category page
│   └── product/         # Product detail page
├── components/          # Shared UI components
└── lib/                 # Auth ও database configuration
```
