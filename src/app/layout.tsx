import './globals.css'

import type { Metadata } from "next";
import { Cormorant } from "next/font/google";

const cormorant = Cormorant({ weight: [ "300", "400", "500", "600", "700" ], style: ["normal", "italic"], subsets: ["latin"], variable: '--font-cormorant' });

export const metadata: Metadata = {
  title: "Joël Bardeau",
  description: "Artiste Photographe plasticien",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable}`}>
      <body className={` min-h-screen bg-black`}
    >{children}</body>
    </html>
  );
}