// "use client";

import "antd/dist/reset.css";
import "../styles/globals.css";

import ErrorBoundary from "antd/es/alert/ErrorBoundary";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        {children}
        {/* <ErrorBoundary>{children}</ErrorBoundary> */}
      </body>
    </html>
  );
}
