import Footer from "@/components/ui/Footer";
import { Navigation } from "@/components/ui/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

