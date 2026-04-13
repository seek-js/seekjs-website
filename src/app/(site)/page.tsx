import CodeExample from "@/components/ui/CodeExample";
import Cta from "@/components/ui/Cta";
import Features from "@/components/ui/Features";
import { GlobalDatabase } from "@/components/ui/GlobalDatabase";
import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <main className="flex flex-col gap-12 overflow-hidden md:gap-16">
      <Hero />
      <GlobalDatabase />
      <CodeExample />
      <Features />
      <Cta />
    </main>
  );
}

