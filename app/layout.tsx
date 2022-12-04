// "use client";

import "antd/dist/reset.css";
import "../styles/globals.css";

import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: // pageProps: { session },
{
  children: React.ReactNode;
  pageProps: { session: any };
}) {
  return (
    <html>
      <head />
      <body>
        {children}
        {/* <SessionProvider session={session}></SessionProvider> */}
        {/* <ErrorBoundary>{children}</ErrorBoundary> */}
      </body>
    </html>
  );
}
