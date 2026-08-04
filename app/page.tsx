import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import WorkShowcase from "@/components/home/WorkShowcase";
import ActivitiesPreview from "@/components/home/ActivitiesPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import StatsSection from "@/components/home/StatsSection";
import HistoryPreview from "@/components/home/HistoryPreview";
import RootsSection from "@/components/home/RootsSection";
import PeoplePreview from "@/components/home/PeoplePreview";
import JoinCta from "@/components/home/JoinCta";
import NewsSection from "@/components/home/NewsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WorkShowcase />
      <ActivitiesPreview />
      <ProjectsPreview />
      <StatsSection />
      <HistoryPreview />
      <RootsSection />
      <PeoplePreview />
      <JoinCta />
      <NewsSection />
    </>
  );
}
