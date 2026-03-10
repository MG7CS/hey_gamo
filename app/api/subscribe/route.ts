import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { language, helpWith, phone } = await req.json();

    if (!phone || !language) {
      return NextResponse.json(
        { error: "Phone number and language are required" },
        { status: 400 }
      );
    }

    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment system is being set up. Please try again later." },
        { status: 503 }
      );
    }

    const stripe = getStripe();

    const customer = await stripe.customers.create({
      phone,
      metadata: {
        language,
        helpWith: helpWith || "",
        source: "heygamo.com",
      },
    });

    await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      trial_period_days: 14,
      payment_behavior: "default_incomplete",
      metadata: {
        language,
        helpWith: helpWith || "",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Subscription error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
