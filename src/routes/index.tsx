import { animate, scroll } from "motion";
import { onMount, createSignal, For } from "solid-js";
import Hero from "~/components/Hero";
import ICreateSection from "~/components/ICreateSection";
import SkillsSection from "~/components/SkillsSection";
import ProjectsSection from "~/components/ProjectsSection";
import Footer from "~/components/Footer";

export default function Home() {
  const [sections, setSections] = createSignal<HTMLDivElement[]>([]);

  onMount(() => {
    const sectionElements = sections();

    scroll(
      animate(sectionElements, {
        offset: ["start end", "end start"],
      })
    );
  });

  return (
    <main class="font-helvetica h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory">
      <div
        ref={(el) => setSections((prev) => [...prev, el])}
        class="h-screen snap-start"
      >
        <Hero />
      </div>
      <div
        ref={(el) => setSections((prev) => [...prev, el])}
        class="h-screen snap-start"
      >
        <ICreateSection />
      </div>
      <div
        ref={(el) => setSections((prev) => [...prev, el])}
        class="h-screen snap-start"
      >
        <SkillsSection />
      </div>
      {/* Projects section - all projects in one scrollable section */}
      <div
        ref={(el) => setSections((prev) => [...prev, el])}
        class="min-h-screen snap-start"
      >
        <ProjectsSection />
      </div>
      {/* Footer section */}
      <div
        ref={(el) => setSections((prev) => [...prev, el])}
        class="h-screen snap-start"
      >
        <Footer />
      </div>
    </main>
  );
}
