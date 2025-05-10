import type { Metadata } from "next";
import { Oswald as OswaldFont } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const oswald = OswaldFont({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prettier Config Generator",
  description:
    "Generate your .prettierrc file effortlessly with this interactive Prettier configuration tool.",
  metadataBase: new URL("https://prettier-config-generator.nooobtimex.me/"),
  keywords: [
    "Prettier",
    "Prettier Config Generator",
    ".prettierrc",
    "Prettier settings",
    "Prettier configuration",
    "Code formatter",
    "JavaScript formatter",
    "Prettier tool",
  ],
  authors: [{ name: "Wongsaphat Puangsorn", url: "https://nooobtimex.me" }],
  creator: "Wongsaphat Puangsorn",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Prettier Config Generator",
    description:
      "Interactive tool to generate a Prettier configuration file effortlessly.",
    url: "https://prettier-config-generator.nooobtimex.me/",
    siteName: "Prettier Config Generator",
    type: "website",
    images: [
      {
        url: "https://prettier-config-generator.nooobtimex.me/og-image.png",
        width: 500,
        height: 500,
        alt: "Prettier Config Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prettier Config Generator",
    description:
      "Effortlessly generate a Prettier config file with this interactive tool.",
    creator: "@nooobtimex",
    images: ["https://prettier-config-generator.nooobtimex.me/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={oswald.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleTagManager gtmId="GTM-N3C2N4G7" />
          <main className="p-6 mx-auto container">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
