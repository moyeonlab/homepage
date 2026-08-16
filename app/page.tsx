import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import WorkShowcase from "@/components/home/WorkShowcase";
import ActivitiesPreview from "@/components/home/ActivitiesPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import RecordSection from "@/components/home/RecordSection";
import RootsSection from "@/components/home/RootsSection";
import PeoplePreview from "@/components/home/PeoplePreview";
import NewsSection from "@/components/home/NewsSection";
import JoinCta from "@/components/home/JoinCta";

/**
 * 홈의 흐름: 누구인가(01~03) → 무엇을 했나(04~05) → 어디서 왔고 누가 있나(06~07)
 *            → 소식(08) → 합류(마무리)
 * 지원 유도가 페이지의 마지막 목소리가 되도록 JoinCta 를 맨 뒤에 둔다.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WorkShowcase />
      <ActivitiesPreview />
      <ProjectsPreview />
      <RecordSection />
      <RootsSection />
      <PeoplePreview />
      <NewsSection />
      <JoinCta />
    </>
  );
}
