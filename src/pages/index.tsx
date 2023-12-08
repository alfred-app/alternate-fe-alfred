import CallToAction from '@/components/home/CallToAction';
import HeroContent from '@/components/home/HeroContent';
import JobCategoryList from '@/components/home/JobCategoryList';

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center gap-3 font-poppins">
      <HeroContent />
      <JobCategoryList />
      <CallToAction />
    </main>
  );
}
