import type { Metadata } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { PERSON } from "@/lib/constants";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const description =
  "Vaibhav Jain, Java and Spring Boot backend developer in Pune with 1.5 years building production APIs in healthtech. Spring Boot, Spring Security, Spring Data JPA, microservices, PostgreSQL, Redis.";

export const metadata: Metadata = {
  metadataBase: new URL(PERSON.siteUrl),
  title: "Vaibhav Jain | Java Spring Boot Developer",
  description,
  openGraph: {
    title: "Vaibhav Jain | Java Spring Boot Developer",
    description,
    url: "/",
    siteName: "Vaibhav Jain",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
