# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখার জন্য তৈরি একটি responsive web application।

## Technologies
- Next.js App Router and React
- TypeScript
- Tailwind CSS v4 + custom responsive CSS
- Better Auth (email/password, Google and GitHub provider configuration)
- React Hot Toast
- Programming Hero BazarDor API

## Features
1. Responsive Bengali interface for mobile, tablet and desktop.
2. Today's price ticker with Bengali digits and price-change indicators.
3. Home sections for rising and falling prices.
4. Product cards and product details with min/max/average prices and market-wise table.
5. Category pages with numeric low-to-high and high-to-low sorting.
6. Sign in, sign up and social-login UI with toast feedback.
7. Protected market-price section and profile name update screen.
8. Loading skeletons, friendly 404 page and SEO metadata.
9. API integration with fallback sample data if the API is unavailable.

## Getting started
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open `http://localhost:3000`.

## Authentication setup
Configure `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `DATABASE_URL`, and the Google/GitHub OAuth client credentials in `.env.local`. Better Auth must use a database supported by the selected adapter and initialized with its generated schema before production authentication is enabled. The current demo keeps a local profile display for UI previews; use the Better Auth session as the source of truth for production access control.

## API
The default endpoint is `https://openapi.programming-hero.com/api/bazardor`. Override it with `NEXT_PUBLIC_BAZARDOR_API` if your provided API endpoint differs.

## Deployment
Deploy to Vercel and add the environment variables above in Project Settings. Confirm dynamic routes, API access and authentication callbacks on the deployed domain.

## Git commit plan
Suggested milestones:
1. `chore: initialize Next.js TypeScript project`
2. `style: add responsive Bengali design system`
3. `feat: connect BazarDor product API`
4. `feat: build home page and price ticker`
5. `feat: add category pages and numeric sorting`
6. `feat: add product detail and market prices`
7. `feat: add authentication pages and toast feedback`
8. `feat: add profile update and 404 states`
9. `docs: write project setup and feature guide`

> Price data is indicative and may change depending on market conditions.