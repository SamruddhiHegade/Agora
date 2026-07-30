import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Agora | Ancient Flavours, Rekindled by Fire",
  description: "Experience the finest Mediterranean cuisine at Agora. Fine-crafted Greek, Italian, and Levantine dishes served with modern reverence.",
  keywords: "Agora, Mediterranean food, Greek restaurant, Italian cuisine, fire crafted food, Bengaluru",
  openGraph: {
    title: "Agora | Ancient Flavours, Rekindled by Fire",
    description: "Experience the finest Mediterranean cuisine at Agora.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <CartProvider>
            <div className="page-wrapper">
              <Navbar />
              <CartSidebar />
              <main>{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
