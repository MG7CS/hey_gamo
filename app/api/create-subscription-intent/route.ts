import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST() {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
    }

    const stripe = getStripe();

    const customer = await stripe.customers.create({
      metadata: { source: "heygamo.com" },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      trial_period_days: 14,
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["pending_setup_intent"],
    });

    const setupIntent = subscription.pending_setup_intent as Stripe.SetupIntent | null;

    if (!setupIntent?.client_secret) {
      return NextResponse.json(
        { error: "Could not create payment setup. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error("Subscription intent error:", error);
    return NextResponse.json(
      { error: "Failed to initialise subscription" },
      { status: 500 }
    );
  }
}
