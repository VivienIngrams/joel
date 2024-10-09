import './globals.css'

import type { Metadata } from "next";
import { Arsenal } from "next/font/google";

import Container from './components/Container';

const arsenal = Arsenal({  variable: '--font-family-arsenal',  weight: [   "400",  "700" ], style: ["normal", "italic"], subsets: ["latin"],  });

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
    <html lang="en" className={`${arsenal.variable}`}>
      <body className={`h-full bg-neutral-950 font-arsenal`}
    >
      <Container>{children}</Container></body>
    </html>
  );
}