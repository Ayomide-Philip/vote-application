import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-white via-blue-50/30 to-white dark:from-zinc-900 dark:via-blue-950/20 dark:to-zinc-900  overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <Navbar />
      <div className="relative">{children}</div>
      <Footer />
    </div>
  );
}
