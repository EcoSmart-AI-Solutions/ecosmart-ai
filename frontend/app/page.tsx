import Image from 'next/image';
import { Header } from '@/components/landingpage/Header';
import {Hero} from '@/components/landingpage/Hero';
import { FeaturesStrip } from '@/components/landingpage/FeatureStrip';
import { FeatureCards } from '@/components/landingpage/FeatureCards';
import { HowItWorks } from '@/components/landingpage/HowItWorks';
import { CTASection } from '@/components/landingpage/CTASection';
import { Footer } from '@/components/landingpage/Footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
  <section className="w-full">
    <div className="overflow-hidden  border-[#e8ece5] bg-white shadow-[0_20px_60px_rgba(54,78,42,0.08)]">
      <Header />
      <Hero />
      <FeaturesStrip />
      <FeatureCards />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  </section>
</main>
  );
}
























