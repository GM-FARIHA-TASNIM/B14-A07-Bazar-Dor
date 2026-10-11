# Bazar Dor

Bazar Dor is a responsive daily market price application built with Next.js.

## Features

- Daily product price listing
- Product categories
- Search and numeric price sorting
- Product details protected by authentication
- Email and password authentication
- Google and GitHub sign-in configuration
- User profile and profile update
- Responsive layout
- Loading skeleton and custom 404 page

## Technologies

- Next.js App Router
- React
- Tailwind CSS
- Better Auth
- JavaScript
- Bazar Dor API

## Installation

Install dependencies:

```bash
npm install
```

Configure the environment variables in `.env.local`.

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## API

Base URL:

https://openapi.programming-hero.com/api/bazardor

Endpoints:

- `/products`
- `/products?category=chal`
- `/products/1`
- `/categories`
- `/categories/chal`
