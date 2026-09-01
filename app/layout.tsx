import type { Metadata } from "next";
import {
  Archivo_Black,
  Geist,
  Geist_Mono,
  Space_Grotesk,
} from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Book Picker Web",
  description: "Book Picker Web app",
  other: {
    "darkreader-lock": "",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
