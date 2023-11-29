import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import { cn } from "@/lib/utils";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X|O МГCосУ",
  description: "Не на жизнь, а на смерть",
  openGraph: {
    title: "X|O МГCосУ",
    description: "Не на жизнь, а на смерть",
    url: "https://tictactoe-kappa-seven.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("py-24", inter.className)}>
        <AuthProvider>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <Header />
          {children}
          <MobileMenu />
          {/* </ThemeProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
