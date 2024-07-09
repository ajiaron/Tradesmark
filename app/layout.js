import { Inter } from "next/font/google";
import Head from 'next/head';
import "../styles/globals.scss";
import { GeistSans } from 'geist/font/sans';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TradesMark",
  description: "TradesMark",
  icons: { icon: "/assets/logo.png", sizes: "any", type: "image/png" }

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
