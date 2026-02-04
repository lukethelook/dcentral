import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "dcentral | Video • Foto • Web",
  description: "Dein digitaler Partner aus dem Salzkammergut. Videografie, Fotografie und Webdesign aus einer Hand.",
  keywords: ["Videografie", "Fotografie", "Webdesign", "Gmunden", "Oberösterreich", "Salzkammergut", "Medienagentur"],
  authors: [{ name: "dcentral" }],
  openGraph: {
    title: "dcentral | Video • Foto • Web",
    description: "Dein digitaler Partner aus dem Salzkammergut.",
    url: "https://dcentral.at",
    siteName: "dcentral",
    locale: "de_AT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="lenis">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
