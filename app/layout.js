import { Inter } from "next/font/google";
import Head from 'next/head';
import "../styles/globals.scss";
import { GeistSans } from 'geist/font/sans';
import { GoogleAnalytics } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });
const googleid = process.env.NEXT_PUBLIC_GOOGLE_TAG

export const metadata = {
  title: "TradesMark",
  description: "TradesMark",
  icons: { icon: "/assets/logo.png", sizes: "any", type: "image/png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId={googleid} />
    </html>
  );
}
