# HEY GAMO

A mobile-first, single-page website for GAMO - a personal WhatsApp assistant helping immigrants navigate life in a new country.

🌐 **Live Site:** [heygamo.com](https://heygamo.com)  
📱 **WhatsApp:** [+1 415-523-8886](https://wa.me/14155238886?text=join+cow-wear) (Twilio Sandbox)

---

## 🎯 Overview

GAMO is a WhatsApp-based personal assistant that helps immigrants with:
- Understanding bills and official letters
- Healthcare and school enrollment questions
- Knowing their rights as immigrants
- Learning English pronunciation and vocabulary

This site showcases the product with real WhatsApp conversation examples in multiple languages (Spanish, Portuguese, Swahili, English).

---

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Payments:** Stripe (embedded checkout)
- **Deployment:** AWS

---

## 📁 Project Structure

```
gamo-site/
├── app/
│   ├── api/
│   │   ├── create-checkout-session/  # Stripe checkout session API
│   │   └── subscribe/                 # Legacy subscription API
│   ├── subscribe/                     # Stripe checkout page (currently disabled)
│   ├── welcome/                       # Post-signup success page
│   ├── globals.css                    # Global styles + Tailwind config
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Main landing page
├── components/
│   ├── Hero.tsx                       # Hero with rotating headlines & photos
│   ├── PhoneMockup.tsx                # WhatsApp conversation showcase
│   ├── HowItWorks.tsx                 # 3-step guide
│   ├── HelpCarousel.tsx               # Feature carousel with chat examples
│   ├── Testimonials.tsx               # User testimonials
│   ├── SimpleCta.tsx                  # Call-to-action section
│   ├── Footer.tsx                     # Site footer
│   └── ...                            # Other components
├── lib/
│   ├── config.ts                      # WhatsApp config & constants
│   └── stripe.ts                      # Stripe client initialization
├── public/
│   └── assets/                        # Hero background images
└── STRIPE_APPROVAL_NOTES.md           # Stripe review instructions
```

---

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account (for payments)
- Twilio WhatsApp sandbox (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/MG7CS/gamo-site.git
cd gamo-site

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
# Stripe Keys (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...

# WhatsApp Number
NEXT_PUBLIC_WHATSAPP_NUMBER=+14155238886
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Key Features

### 1. **Multilingual Hero Section**
- Rotating headlines in 4 languages (Portuguese, French, Swahili, English)
- Cycling background photos of diverse users
- Floating chat bubbles for visual interest
- Synced WhatsApp chat preview

### 2. **Interactive Phone Mockups**
- Real WhatsApp-style conversations
- Auto-cycling between text, voice, and photo examples
- Authentic chat bubble styling with timestamps and read receipts

### 3. **Feature Carousel**
- Full-screen slides for each use case
- Phone mockup with real chat examples
- Language-specific floating bubbles
- Outcome highlights with checkmarks

### 4. **Mobile-First Design**
- Responsive breakpoints for all screen sizes
- Touch-friendly interactions
- Optimized images with Next.js Image component
- Smooth animations with Framer Motion

---

## 💳 Stripe Integration (Currently Disabled)

The Stripe checkout is **temporarily disabled** for Stripe approval. All CTAs currently redirect to WhatsApp sandbox.

### To Re-enable After Approval:

1. Open `app/subscribe/page.tsx`
2. Delete lines 1-24 (temporary redirect code)
3. Uncomment lines 28-180 (Stripe checkout code)
4. Update all CTA buttons to use `router.push('/subscribe')` instead of WhatsApp links
5. Deploy

See `STRIPE_APPROVAL_NOTES.md` for detailed instructions.

---

## 📱 WhatsApp Integration

### Current Setup (Twilio Sandbox)
- **Number:** +1 415-523-8886
- **Join Code:** `join cow-wear`
- **Link:** `https://wa.me/14155238886?text=join+cow-wear`

### For Production
When you have a WhatsApp Business API number:
1. Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`
2. Replace all `wa.me/14155238886` links with your production number
3. Remove the `join+cow-wear` join code

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables on Vercel
Add these in your Vercel project settings:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

---

## 📝 Content Updates

### Update Hero Headlines
Edit `components/Hero.tsx` → `heroSlides` array

### Update Features
Edit `components/HelpCarousel.tsx` → `features` array

### Update Testimonials
Edit `components/Testimonials.tsx` → `testimonials` array

### Update Pricing
Edit `components/SimpleCta.tsx` and `app/subscribe/page.tsx`

---

## 🐛 Known Issues

- Stripe product summary header cannot be fully hidden in embedded checkout (Stripe limitation)
- Floating chat bubbles hidden on mobile to prevent overlap
- Hero headline height may need adjustment for very long translations

---

## 📄 License

Private repository - All rights reserved.

---

## 🤝 Contributing

This is a private project. For questions or support, contact hello@heygamo.com.

---

**Built with 💚 for people navigating life in a new country**
