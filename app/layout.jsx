
import "./globals.css";
import {inter} from "./fonts";

export const metadata = {
  title: "Cinescope Dashboard",
  description: "Movie Database and Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.className} `}
      >
        {children}
      </body>
    </html>
  );
}
