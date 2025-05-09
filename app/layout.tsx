import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prettier Config Generator",
  description:
    "Generate your .prettierrc file effortlessly with this interactive Prettier configuration tool.",
  metadataBase: new URL("https://prettier-config-generator.nooobtimex.me/"),
  openGraph: {
    title: "Prettier Config Generator",
    description: "Interactive tool to generate a Prettier configuration file.",
    url: "https://prettier-config-generator.nooobtimex.me/",
    siteName: "Prettier Config Generator",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-N3C2N4G7" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="p-6 mx-auto container">{children}</main>
      </body>
    </html>
  );
}
