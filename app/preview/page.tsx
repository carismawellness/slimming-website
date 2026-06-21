import SmoothScroll from '@/components/redesign/SmoothScroll';
import PreviewNav from '@/components/redesign/PreviewNav';
import Hero from '@/components/redesign/Hero';
import Proof from '@/components/redesign/Proof';
import Problem from '@/components/redesign/Problem';
import Method from '@/components/redesign/Method';
import Journey from '@/components/redesign/Journey';
import Glp1 from '@/components/redesign/Glp1';
import Treatments from '@/components/redesign/Treatments';
import WhyCarisma from '@/components/redesign/WhyCarisma';
import Reviews from '@/components/redesign/Reviews';
import Doctors from '@/components/redesign/Doctors';
import Faq from '@/components/redesign/Faq';
import FinalCta from '@/components/redesign/FinalCta';
import PreviewFooter from '@/components/redesign/PreviewFooter';
import StickyCta from '@/components/redesign/StickyCta';

export default function PreviewPage() {
  return (
    <div className="cx-root">
      <SmoothScroll />
      <PreviewNav />
      <Hero />
      <Proof />
      <Problem />
      <Method />
      <Journey />
      <Glp1 />
      <Treatments />
      <WhyCarisma />
      <Reviews />
      <Doctors />
      <Faq />
      <FinalCta />
      <PreviewFooter />
      <StickyCta />
    </div>
  );
}
