import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { ThemeProviders } from "./themeProviders";
import PageLayout from "./pageLayout";
import ReduxProvider from "./ReduxProvider";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "PC Craft",
  description: "Build Your Custom PC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("layout render");

  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <ThemeProviders>
          <ReduxProvider>
            <PageLayout>{children}</PageLayout>
          </ReduxProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
