import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemesProvider from "@/libs/themeprovider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Votely",
  description: "Decisions made clear",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
      >
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          toastClassName="!rounded-xl !px-4 !py-3 !shadow-lg !border !border-slate-200 !bg-white !text-slate-900 dark:!bg-slate-900 dark:!text-white dark:!border-slate-700 !text-sm !font-semibold !leading-relaxed"
          bodyClassName="!flex !items-center !gap-2"
          className="w-full! max-w-md!"
        />
        <ThemesProvider>{children}</ThemesProvider>
      </body>
    </html>
  );
}
