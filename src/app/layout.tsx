import './globals.css'

import type { Metadata } from "next";
import { Arsenal,  Cinzel, Montserrat, } from "next/font/google";

import Container from './components/Container';

const arsenal = Arsenal({  variable: '--font-family-arsenal',  weight: [   "400",  "700" ], style: ["normal", "italic"], subsets: ["latin"],  });
const montserrat = Montserrat({  variable: '--font-family-montserrat',  weight: ["200", "300", "400", "500", "600", "700" ], style: ["normal"], subsets: ["latin"],  });
const cinzel = Cinzel({  variable: '--font-family-cinzel',  weight: [  "800", "500",   "400", "700", "900" ], style: ["normal"], subsets: ["latin"],  });

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
    <html lang="en" className={`${montserrat.variable} ${arsenal.variable} ${cinzel.variable}`}>
      <body className={`h-full bg-white font-cinzel `}
    >
      <Container>{children}</Container></body>
    </html>
  );
}