import { backendClient } from "@/sanity/lib/backendClient";

export async function createOrderInSanity() {
  throw new Error(
    "Stripe-based order creation has been removed. Use WhatsApp quote requests instead.",
  );
}
