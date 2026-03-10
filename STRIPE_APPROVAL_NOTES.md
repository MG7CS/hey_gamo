# Stripe Approval - Temporary Changes

## What was changed for Stripe approval

To allow Stripe reviewers to see the actual product (GAMO WhatsApp assistant) in action, all payment CTAs have been temporarily replaced with direct WhatsApp links.

### Changed files:

1. **`components/Navbar.tsx`** - "Start Free Trial" button → WhatsApp link
2. **`components/Hero.tsx`** - "Try GAMO Free for 2 Weeks" button → WhatsApp link
3. **`components/HowItWorks.tsx`** - "Start chatting" button → WhatsApp link
4. **`components/SimpleCta.tsx`** - "Try GAMO Free for 2 Weeks" button → WhatsApp link
5. **`components/Footer.tsx`** - "Start Free Trial" link → WhatsApp link
6. **`app/subscribe/page.tsx`** - Entire Stripe checkout page commented out, redirects to WhatsApp

### How to restore Stripe checkout after approval:

1. **Open `app/subscribe/page.tsx`**
2. **Delete lines 1-24** (the temporary redirect code)
3. **Uncomment lines 28-180** (remove the `/*` at line 28 and `*/` at line 180)
4. **Restore the CTA buttons** in the components listed above by reversing the changes:
   - Change `<a href="https://wa.me/16503744396?text=Hey%20GAMO" ...>` back to `<button onClick={() => router.push("/subscribe")} ...>`
   - Re-import `useRouter` from `next/navigation` where needed
   - Update button text back to original (e.g., "Start Free Trial", "Try GAMO Free for 2 Weeks")

### WhatsApp sandbox link used:
```
https://wa.me/14155238886?text=join+cow-wear
```

**Note:** This is a Twilio sandbox number. The `join+cow-wear` message automatically joins the sandbox so reviewers can test immediately.

This allows Stripe reviewers to:
- See the actual product in action
- Test the WhatsApp assistant functionality
- Understand what customers are paying for
- Verify the business model

---

## After Stripe approval AND WhatsApp production number:

When you have your production WhatsApp Business number, update:

1. **`.env.local`** - Change `NEXT_PUBLIC_WHATSAPP_NUMBER` to your production number
2. **All component files** - Replace `https://wa.me/14155238886?text=join+cow-wear` with your production WhatsApp link (e.g., `https://wa.me/YOUR_NUMBER?text=Hey%20GAMO`)
3. **Restore Stripe checkout** - Follow the instructions above to uncomment the subscribe page

---

**Date:** March 10, 2026  
**Status:** Awaiting Stripe approval  
**WhatsApp:** Using Twilio sandbox (+1 415-523-8886)
