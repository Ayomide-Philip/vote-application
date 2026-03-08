import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemesProvider from "@/libs/themeprovider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Ballot Right",
    template: "%s | Ballot Right",
  },
  description:
    "BallotRight is a secure, reliable, and easy-to-use digital voting platform designed to empower every voter. With BallotRight, casting your vote has never been simpler — whether it’s for school elections, community polls, or organizational decisions, your voice counts and your choice is protected.",
  keywords: ["Vote", "Voting", "Ballot", "Balloting", "Poll", "Polls", "Right"],
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
      >
        <Toaster
          position="top-center"
          duration={4000}
          theme="system"
          richColors
          closeButton
          toastOptions={{
            className:
              "!w-[94vw] sm:!w-auto sm:!max-w-[700px] !rounded-xl !px-3 sm:!px-4 !py-2.5 sm:!py-3 !text-xs sm:!text-sm !font-semibold !leading-relaxed !shadow-lg !border !border-slate-200 dark:!border-slate-700 !break-words sm:!whitespace-nowrap",
          }}
        />
        <ThemesProvider>{children}</ThemesProvider>
      </body>
    </html>
  );
}
