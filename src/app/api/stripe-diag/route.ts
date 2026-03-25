/** Temporary diagnostic — remove after confirming Stripe connectivity */
export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return Response.json({ error: "STRIPE_SECRET_KEY not set" }, { status: 500 });
  if (key.includes("\\n")) return Response.json({ error: "key has literal \\n — needs cleanup", keyLen: key.length }, { status: 500 });

  try {
    const res = await fetch("https://api.stripe.com/v1/products?limit=1", {
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = (await res.json()) as Record<string, unknown>;
    return Response.json({ status: res.status, ok: res.ok, hasData: !!data.data, keyLen: key.length });
  } catch (e) {
    return Response.json({ error: String(e), keyLen: key.length }, { status: 502 });
  }
}
