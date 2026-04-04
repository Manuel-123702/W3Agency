import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: "%s - W3Agency online store",
    default: "W3Agency online store",
  },
  description:
    "W3Agency online store, your one-stop shop for all things awesome.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="py-20">{children}</main>
        <Footer />

      </div>
    </ClerkProvider>
  );
}
