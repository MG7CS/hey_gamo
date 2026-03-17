import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Beta access code — two words related to what GAMO does:
// helping people find a wise path through life in a new country.
const BETA_CODE = "wise path";

export async function POST(req: NextRequest) {
  try {
    const { name, city, state, code } = await req.json();

    if (!name || !city || !state || !code) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (code.trim().toLowerCase() !== BETA_CODE) {
      return NextResponse.json(
        { error: "Invalid access code. Please double-check and try again." },
        { status: 401 }
      );
    }

    await getStripe().customers.create({
      name,
      metadata: {
        city,
        state,
        source: "beta_test",
        joined_at: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Beta access error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
