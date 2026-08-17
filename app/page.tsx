import Shell from "@/components/blueprint/Shell";
import Hero from "@/components/bp-home/Hero";
import Statement from "@/components/bp-home/Statement";
import Method from "@/components/bp-home/Method";
import Work from "@/components/bp-home/Work";
import Record from "@/components/bp-home/Record";
import Roots from "@/components/bp-home/Roots";
import Join from "@/components/bp-home/Join";

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Statement />
      <Method />
      <Work />
      <Record />
      <Roots />
      <Join />
    </Shell>
  );
}
