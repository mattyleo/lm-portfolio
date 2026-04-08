import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <Services />
      <Contact />
    </div>
  );
}
