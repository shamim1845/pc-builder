"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProviders({ children }: { children: ReactNode }) {
  console.log("themeProvider render");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableColorScheme
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
