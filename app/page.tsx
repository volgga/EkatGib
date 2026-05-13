import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { Areas } from "@/components/sections/areas";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { QuoteSeparator } from "@/components/sections/quote-separator";
import { Reviews } from "@/components/sections/reviews";

export default function Home() {
  return (
    <div className="site-canvas min-h-screen">
      <Header />
      <main className="relative z-0 overflow-hidden">
        <Hero />
        <About />
        <Areas />
        <QuoteSeparator>
          Иногда семье нужен не тот, кто скажет, кто прав. А тот, кто поможет снова услышать друг друга.
        </QuoteSeparator>
        <Approach />
        <Process />
        <Reviews />
        <Pricing />
        <Contact />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
