import Container from "@/components/Container";
import Newsletter from "@/components/Newsletter";
import GridProduct from "@/components/GridProduct";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";
import { safeClientFetch } from "@/sanity/lib/client";
import type { Category, Product } from "@/sanity.types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  ArrowRight,
  MessageCircleMore,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";

import React from "react";

const Home = async () => {
  const categories = (await getCategories(6)) as Category[];
  const products = await safeClientFetch<Product[]>(`
    *[_type == "product"] | order(_createdAt desc)[0...100]{
    _id,
    name,
    "image": images[0].asset->url
  }
  `);

  return (
    <Container className="bg-shop-light-pink -mt-16">
      <HomeBanner />
      <section className="relative my-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-6 text-white shadow-2xl md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.25),_transparent_40%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Premium experience
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              A refined buying journey for machines, gadgets, and electronics.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Browse premium devices, save favorites, and continue your order
              through WhatsApp whenever you are ready to discuss pricing,
              availability, and secure payment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl({
                  message:
                    "Hello! I would like to discuss pricing, availability, and payment for your products over WhatsApp.",
                })}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                <MessageCircleMore className="h-4 w-4" />
                Chat on WhatsApp to order & pay
              </a>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-semibold text-white transition hover:bg-white/20"
              >
                Browse products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Private consulting",
                copy: "Talk directly with our team for tailored pricing and recommendations.",
                icon: MessageCircleMore,
              },
              {
                title: "Premium presentation",
                copy: "Thoughtful layouts and animations make browsing feel effortless.",
                icon: Sparkles,
              },
              {
                title: "Flexible orders",
                copy: "From single-device requests to bulk sourcing, we adapt to your needs.",
                icon: Truck,
              },
              {
                title: "Trusted support",
                copy: "We guide buyers from discovery to confirmation with clarity and care.",
                icon: ShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">{item.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <GridProduct products={products} />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <GridProduct products={products} />
      <ShopByBrands />
      <GridProduct products={products} />
      <LatestBlog />
      <Newsletter />
    </Container>
  );
};

export default Home;
