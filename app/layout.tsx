import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { SocketProvider } from "@/components/providers/SocketProvider";
import { Suspense } from "react";
import Loading from "@/components/HeaderFallback";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="ru">
        <body className={cn("py-24", inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SocketProvider>
              <Suspense fallback={<Loading />}>
                <Header />
              </Suspense>
              {children}
              <MobileMenu />
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
