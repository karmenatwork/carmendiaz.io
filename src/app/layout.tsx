import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carmen Díaz",
  description:  'I am Carmen, a Software Developer and Mom based in San Francisco, CA ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <div className="flex w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
