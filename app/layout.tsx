import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ballot - Institutional Online Voting Platform",
  description: "Institutional-grade online voting platform for schools, universities, and organizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
