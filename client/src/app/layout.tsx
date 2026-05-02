import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import LayoutShell from "@/components/LayoutShell";
import AuthModal from "@/components/auth/AuthModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Masaliya Di Hatti | Premium Spices Since 1928",
  description: "Authentic Indian spices and heritage blends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        <AuthProvider>
          <CartProvider>
            <LayoutShell>{children}</LayoutShell>
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

