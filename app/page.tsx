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
    <div className="min-h-screen bg-[radial-gradient(circle_at_78%_4%,rgba(144,180,206,0.13),transparent_28rem),linear-gradient(180deg,#ffffff_0%,#fbfdff_34%,#ffffff_100%)]">
      <Header />
      <main>
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
