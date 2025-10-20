
import "./globals.css";
import {inter} from "./fonts";

export const metadata = {
  title: "Cinescope Dashboard",
  description: "Movie Database and Management Dashboard",
};


import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" className="light" suppressHydrationWarning>
        <head />
        <body  className={`${inter.className} `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
