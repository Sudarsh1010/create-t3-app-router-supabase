import "~/styles/globals.css";

import { Spline_Sans_Mono } from "next/font/google";

import { Header } from "~/components/header";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          `bg-background font-sans text-foreground antialiased`,
          splineSansMono.variable,
        )}
      >
        <TRPCReactProvider>
          <Header />
          {children}
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}