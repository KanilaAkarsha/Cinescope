import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { inter } from "./fonts";

export const metadata = {
  icons: {
    icon: "../public/logo.svg",
  },
  title: "Cinescope Dashboard",
  description: "Movie Database and Management Dashboard",
};

import { ThemeProvider } from "@/components/theme-provider";
import { Logo } from "@/components/logo";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" className="light" suppressHydrationWarning>
        <head />
        <body className={`${inter.className} antialiased`}>
          <NextTopLoader color="primary" />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
