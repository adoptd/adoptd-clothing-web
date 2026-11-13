import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { getSiteSettings } from "@/lib/airtable";
import { constructMetadata, generateOrganizationJsonLd, generateWebSiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({});

// Airtable-backed content is loaded at request time, not during Vercel builds.
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  // Escape "<" so JSON-LD cannot accidentally terminate its script element.
  const organizationJsonLd = JSON.stringify(generateOrganizationJsonLd(settings)).replace(/</g, '\\u003c');
  const websiteJsonLd = JSON.stringify(generateWebSiteJsonLd()).replace(/</g, '\\u003c');

  return (
    <html lang="en-GB" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-white text-stone-900 selection:bg-stone-900 selection:text-white" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLd }}
        />
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer settings={settings} />
      </body>
    </html>
  );
}
