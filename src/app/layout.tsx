import './globals.css'

import type { Metadata } from "next";
import { Arsenal, Barlow, Oswald } from "next/font/google";

import Container from './components/Container';

const arsenal = Arsenal({  variable: '--font-family-arsenal',  weight: [   "400",  "700" ], style: ["normal", "italic"], subsets: ["latin"],  });
const barlow = Barlow({  variable: '--font-family-barlow',  weight: [ "100", "200",  "400",  "700" ], style: ["normal", "italic"], subsets: ["latin"],  });
const oswald = Oswald({  variable: '--font-family-oswald',  weight: [  "400",  "700" ], style: ["normal"], subsets: ["latin"],  });

export const metadata: Metadata = {
  title: "Joël Bardeau",
  description: "Artiste Auteur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${arsenal.variable}`}>
      <body className={`h-full bg-[#4b5563] `}
    >
      <Container>{children}</Container></body>
    </html>
  );
}