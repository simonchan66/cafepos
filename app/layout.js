import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cafe POS",
  description: "Made by Simon Chan",
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html></AuthContextProvider>
  );
}
