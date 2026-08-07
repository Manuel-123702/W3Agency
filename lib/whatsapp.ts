const DEFAULT_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237650921917";

export function buildWhatsAppUrl({
  message,
  phone = DEFAULT_PHONE,
}: {
  message?: string;
  phone?: string;
}) {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(
    message || "Hello! I would like to request a quote for your products."
  );

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function buildCartQuoteMessage({
  items,
  total,
  customerName,
}: {
  items: Array<{ name: string; quantity: number; price?: number }>;
  total: number;
  customerName?: string;
}) {
  const header = customerName
    ? `Hello! I am ${customerName} and I would like to request a quote for the following items.`
    : "Hello! I would like to request a quote for the following items.";

  const itemLines = items
    .map((item) => `- ${item.name} x${item.quantity}${typeof item.price === "number" ? ` — ${item.price.toLocaleString()} XAF` : ""}`)
    .join("\n");

  return `${header}\n\n${itemLines}\n\nEstimated total: ${total.toLocaleString()} XAF\n\nPlease share availability, delivery details, and the best private price for these items.`;
}
