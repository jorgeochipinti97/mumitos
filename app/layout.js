import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Navbar } from "./components/Navbar";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cheeky | Moda Infantil",
  description:
    "Descubre en Mumitos la mejor selección de ropa infantil. Estilos únicos y cómodos para niños y niñas. Calidad y moda sostenible para tus pequeños.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta
          name="keywords"
          content="ropa infantil Monte Grande, moda para niños Monte Grande, ropa para niños, tienda de ropa infantil, moda infantil Monte Grande"
        />
      </head>
      <body className={inter.className} >
        <Providers>
          <Navbar />

          {children}
        </Providers>
      </body>
    </html>
  );
}
