import { animate, stagger, timeline, inView } from "motion";
import { Component, createEffect, onMount, For, onCleanup } from "solid-js";

const SkillsSection: Component = () => {
  let skillsContainerRef: HTMLDivElement | undefined;
  let skillsListRef: HTMLDivElement | undefined;
  let paragraphsRef: HTMLDivElement | undefined;
  let skillElements: HTMLDivElement[] = [];
  let paragraphElements: HTMLParagraphElement[] = [];

  // Define the base skills to display with appropriate normal saturation colors
  const baseSkills = [
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "React", color: "#61DAFB" },
    { name: "Solid.js", color: "#2C4F7C" },
    { name: "Node.js", color: "#339933" },
    { name: "Vue.js", color: "#4FC08D" },
    { name: "Python", color: "#3776AB" },
    { name: "Rust", color: "#CE422B" },
    { name: "Go", color: "#00ADD8" },
    { name: "Next.js", color: "#000000" },
    { name: "TailwindCSS", color: "#06B6D4" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "MongoDB", color: "#47A248" },
    { name: "AWS", color: "#FF9900" },
    { name: "Kafka", color: "#231F20" },
    { name: "Redis", color: "#DC382D" },
    { name: "RabbitMQ", color: "#FF6600" },
    { name: "Docker", color: "#2496ED" },
    { name: "PyTorch", color: "#EE4C2C" },
  ];

  // Create an array with duplicated skills for seamless infinite scroll
  // We duplicate the entire array to ensure smooth looping
  const skills = [...baseSkills, ...baseSkills];

  onMount(() => {
    if (!skillsListRef || !skillElements.length || !paragraphsRef) return;

    // Setup in-view animations for the section
    const cleanupInView = inView(skillsContainerRef as HTMLElement, () => {
      // Animate the skills container
      animate(
        skillsListRef.parentElement as HTMLElement,
        {
          opacity: [0, 1],
          x: [-30, 0],
        },
        {
          duration: 0.8,
          delay: 0.2,
          easing: [0.25, 0.1, 0.25, 1],
        }
      );

      // Small delay to ensure DOM is fully rendered before calculating heights
      setTimeout(() => {
        if (!skillsListRef) return;
        
        // Calculate the exact height needed for seamless infinite scroll
        // Since we have exactly 2 copies of the same skills, we move by half the total height
        const totalHeight = skillsListRef.scrollHeight;
        const halfHeight = totalHeight / 2;

        // Create infinite scrolling animation with precise calculations
        const infiniteScrollAnimation = animate(
          skillsListRef,
          {
            y: [0, -halfHeight],
          },
          {
            duration: 25, // Optimal speed for readability
            easing: "linear",
            repeat: Infinity,
          }
        );

        // Store animation for cleanup
        onCleanup(() => {
          infiniteScrollAnimation.cancel();
        });
      }, 100);

      // Animate the paragraphs to fade in
      animate(
        paragraphElements,
        {
          opacity: [0, 1],
          x: [30, 0],
        },
        {
          delay: stagger(0.15, { start: 0.5 }),
          duration: 0.7,
          easing: [0.25, 0.1, 0.25, 1],
        }
      );
    });

    onCleanup(() => {
      cleanupInView();
    });
  });

  return (
    <div
      ref={skillsContainerRef}
      class="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div class="w-full flex flex-col md:flex-row items-center">
        {/* Skills list column with gradient masks */}
        <div class="w-full md:w-2/3 h-[100vh] overflow-y-clip flex items-center justify-center relative pl-8 lg:pl-16 xl:pl-24">
          {/* Top gradient mask for foggy fade effect */}
          <div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-transparent z-10"></div>

          <div
            ref={skillsListRef}
            class="will-change-transform"
            style={{
              "transform-style": "preserve-3d",
              transform: "perspective(1000px) rotateY(5deg)",
              "backface-visibility": "hidden",
              "-webkit-backface-visibility": "hidden",
            }}
          >
            <For each={skills}>
              {(skill, index) => (
                <div
                  ref={(el) => (skillElements[index()] = el)}
                  class="skill-item text-4xl md:text-5xl lg:text-[180px] xl:text-[260px] font-bold my-5 relative px-4 font-helvetica-compressed uppercase origin-bottom -rotate-[22deg] -skew-x-[23deg]"
                  style={{ color: skill.color }}
                >
                  {skill.name}
                </div>
              )}
            </For>
          </div>

          {/* Bottom gradient mask for foggy fade effect */}
          <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
        </div>

        {/* Paragraphs column */}
        <div
          ref={paragraphsRef}
          class="w-full md:w-1/3 flex flex-col gap-x-8 relative font-modernist pr-12"
        >
          <div class="flex justify-between">
          <span class="text-lg md:text-xl text-black font-modernist">(2)</span>
          <span class="text-lg md:text-xl text-black font-modernist">about</span>

          </div>

          <div class="space-y-6 relative pt-12 xl:pl-16 xl:pr-20">
            <p
              ref={(el) => paragraphElements.push(el)}
              class="text-lg md:text-xl opacity-0"
            >
              I'm an experienced web developer with a passion for creating
              beautiful, functional, and responsive web applications.
            </p>
            <p
              ref={(el) => paragraphElements.push(el)}
              class="text-lg md:text-xl opacity-0"
            >
              My technical expertise spans frontend and backend technologies,
              allowing me to build complete solutions from development to deployment.
            </p>
            <p
              ref={(el) => paragraphElements.push(el)}
              class="text-lg md:text-xl opacity-0"
            >
              I'm adept at writing clean, maintainable code and creating
              intuitive user interfaces that provide exceptional user
              experiences.
            </p>
            <p
              ref={(el) => paragraphElements.push(el)}
              class="text-lg md:text-xl opacity-0"
            >
              With a strong foundation in modern web frameworks and tools, I can
              tackle complex problems and deliver robust solutions that meet
              business needs.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
