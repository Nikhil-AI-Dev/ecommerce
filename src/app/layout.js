import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { AuthProvider } from "../components/AuthProvider";
import Footer from "../components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ["latin"],
  variable: "--font-lato",
  display: 'swap',
});

export const metadata = {
  title: "Sri Lakshmi Narayana Handlooms | Artisanal Handwoven Sarees",
  description: "Experience the timeless elegance of authentic Banarasi, Gadwal, and Silk sarees. Premium wholesale and retail heritage store established to preserve the art of handweaving.",
  keywords: ["sarees", "handlooms", "Banarasi silk", "Gadwal sarees", "ethnic wear", "wholesale sarees Hyderabad"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} suppressHydrationWarning>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <div style={{ flex: 1 }}>
                {children}
              </div>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
