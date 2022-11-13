import React from "react";
import { Montserrat } from "@next/font/google";
import "styles/globals.css";

interface Props {
  children: React.ReactNode;
}

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <head />
      <body className={`${montserrat.className}`}>{children}</body>
    </html>
  );
}
