import './globals.css'

import type { Metadata } from "next";
import { Barlow } from "next/font/google";

const barlow = Barlow({  variable: '--font-family-barlow',  weight: [ "100", "300", "400", "500", "600", "700" ], style: ["normal", "italic"], subsets: ["latin"],  });

export const metadata: Metadata = {
  title: "Joël Bardeau",
  description: "Artiste Photographe Plasticien",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable}`}>
      <body className={`h-full text-white `}
    >{children}</body>
    </html>
  );
}