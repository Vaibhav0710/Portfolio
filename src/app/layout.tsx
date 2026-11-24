import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { PERSON } from "@/lib/constants";
import { THEME_SCRIPT } from "@/lib/theme";

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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "600"],
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
    // The head script adds the "dark" class before hydration, so the class differs from the server markup
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
