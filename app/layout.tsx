import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProviders } from "./themeProviders";
import PageLayout from "./pageLayout";
import ReduxProvider from "./ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  preload: true,
});

export const metadata: Metadata = {
  title: "PC Craft",
  description: "Build Your Custom PC.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("layout render");

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProviders>
          <ReduxProvider>
            <PageLayout>{children}</PageLayout>
          </ReduxProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
