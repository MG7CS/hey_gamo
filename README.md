# GAMO Marketing Site

A single-page marketing site for GAMO — a personal assistant on WhatsApp that helps people navigate life in a new country, in their language.

## Features

- **Hero section** with cycling photos and multilingual headlines (Spanish, Portuguese, Kinyarwanda)
- **WhatsApp chat mockups** showing real conversations in multiple languages
- **Full-screen carousel** demonstrating 4 key use cases with phone mockups
- **Onboarding modal** with multi-language/multi-topic selection
- **Stripe integration** for 14-day free trial → $9.99/month subscription
- **Mobile-first design** optimized for WhatsApp sharing

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Stripe SDK

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` with your keys:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PRICE_ID=price_...
   NEXT_PUBLIC_WHATSAPP_NUMBER=+16503744396
   ```

3. **Run the dev server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

Make sure to add your environment variables in the Vercel dashboard.

## Project Structure

```
/app
  /layout.tsx          — root layout with Nunito font
  /page.tsx            — main page composing all sections
  /globals.css         — Tailwind + custom WhatsApp styles
  /api/subscribe/route.ts — Stripe subscription endpoint

/components
  /Navbar.tsx          — sticky header
  /Hero.tsx            — cycling photos + multilingual headlines
  /PhoneMockup.tsx     — 3 swipeable WhatsApp chats
  /ChatBubble.tsx      — WhatsApp-style message components
  /HowItWorks.tsx      — 3-step explainer
  /HelpCarousel.tsx    — full-screen feature carousel
  /Testimonials.tsx    — user quotes in multiple languages
  /SimpleCta.tsx       — WhatsApp CTA section
  /CtaBanner.tsx       — trial signup CTA
  /OnboardingModal.tsx — multi-step form
  /Footer.tsx          — footer with links

/lib
  /config.ts           — WhatsApp number, messages, constants
  /stripe.ts           — Stripe client initialization
```

## Key Design Decisions

- **Colors**: WhatsApp green (#075E54, #25D366) + warm cream (#FFF8F0)
- **Typography**: Nunito (rounded, friendly)
- **Mobile-first**: All layouts start from mobile breakpoint
- **WhatsApp fidelity**: Chat bubbles match real WhatsApp styling exactly
- **Performance**: Optimized for 3G connections (target audience)

## Stripe Subscription Flow

1. User fills out onboarding form (languages, help topics, phone)
2. `POST /api/subscribe` creates Stripe customer + subscription with 14-day trial
3. User redirects to WhatsApp with pre-filled message in their language
4. After 14 days, Stripe auto-charges $9.99/month
5. User can cancel anytime by messaging GAMO on WhatsApp

## License

All rights reserved © 2026 GAMO
