import Benefits from "@/components/home/Benefits";
import CallToAction from "@/components/home/CallToAction";
import HeroContent from "@/components/home/HeroContent";
import JobCategoryList from "@/components/home/JobCategoryList";
import LayoutWrapper from "@/components/layouts/LayoutWrapper";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center gap-3 font-poppins">
      <HeroContent />
      <HeroContent />
      <JobCategoryList />
      <Benefits />
      <CallToAction />
    </main>
  );
}
