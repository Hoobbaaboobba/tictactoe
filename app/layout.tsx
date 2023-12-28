import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

import { ClerkProvider, auth, clerkClient, currentUser } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="ru">
        <body className={cn("py-24", inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <MobileMenu />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
