import "~/styles/globals.css";

import { Spline_Sans_Mono } from "next/font/google";

import { Toaster } from "~/app/_components/ui/sonner";
import { cn } from "~/app/_lib/utils";
import { TRPCReactProvider } from "~/trpc/react";

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "T3 app with clean architecture",
  description:
    "A create T3 app template with layers architecture and supabase integration",
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
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
