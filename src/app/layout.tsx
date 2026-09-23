import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { getSiteSettings } from "@/lib/airtable";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en-GB" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased bg-white text-stone-900 selection:bg-stone-900 selection:text-white">
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer settings={settings} />
      </body>
    </html>
  );
}
