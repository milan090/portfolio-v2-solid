import { animate, inView, stagger } from "motion";
import { Component, onMount, onCleanup, For } from "solid-js";

interface Project {
  id: number;
  name: string;
  date: string;
  type: string;
  description: string;
  image: string;
  link: string;
}

const ProjectsSection: Component = () => {
  let containerRef: HTMLDivElement | undefined;
  let numberRef: HTMLSpanElement | undefined;
  let titleRef: HTMLSpanElement | undefined;
  let projectElements: HTMLDivElement[] = [];

  onMount(() => {
    if (!containerRef) return;

    const cleanupInView = inView(
      containerRef,
      () => {
        // Animate section number and title
        if (numberRef && titleRef) {
          animate(
            [numberRef, titleRef],
            {
              opacity: [0, 1],
              y: [20, 0],
            },
            {
              duration: 0.8,
              delay: 0.1,
              easing: [0.25, 0.1, 0.25, 1],
            }
          );
        }

        // Animate projects with stagger
        animate(
          projectElements,
          {
            opacity: [0, 1],
            y: [40, 0],
          },
          {
            duration: 0.8,
            delay: stagger(0.2, { start: 0.3 }),
            easing: [0.25, 0.1, 0.25, 1],
          }
        );
      },
      {
        amount: 0.1,
      }
    );

    onCleanup(() => {
      cleanupInView();
    });
  });

  return (
    <div
      ref={containerRef}
      class="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 px-8 md:px-16 lg:px-24 py-20"
    >
      {/* Header */}
      <div class="flex justify-between items-start mb-16">
        <span
          ref={numberRef}
          class="text-lg md:text-xl text-black font-modernist opacity-0"
        >
          (03)
        </span>
        <span
          ref={titleRef}
          class="text-lg md:text-xl text-black font-modernist opacity-0"
        >
          projects
        </span>
      </div>

      {/* Projects List */}
      <div class="max-w-5xl mx-auto space-y-24">
        <For each={projectsData}>
          {(project, index) => (
            <div
              ref={(el) => (projectElements[index()] = el)}
              class="opacity-0"
            >
              <div class="flex flex-col md:flex-row gap-12 items-start">
                {/* Left side - Project info without title */}
                <div class="flex-1 flex flex-col justify-center">
                  <div class="flex items-center gap-4 mb-2">
                    <span class="text-sm text-gray-600 font-modernist">
                      ({project.id.toString().padStart(2, '0')})
                    </span>
                    <span class="text-sm text-gray-600 font-modernist">
                      {project.date}
                    </span>
                  </div>
                  
                  <div class="mb-6">
                    <span class="text-sm text-gray-600 font-modernist uppercase tracking-wide block mb-4">
                      {project.type}
                    </span>
                    <p class="text-lg md:text-xl text-gray-800 font-modernist max-w-2xl">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right side - Project image with title and link below */}
                <div class="w-full md:w-[450px] lg:w-[600px] flex-shrink-0">
                  <div class="bg-gray-300 aspect-[5/3] rounded-lg overflow-hidden shadow-lg mb-6">
                    <img
                      src={project.image}
                      alt={project.name}
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Title and link below image */}
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h3 class="text-4xl md:text-5xl lg:text-6xl font-helvetica-compressed font-medium uppercase leading-none">
                        {project.name}
                      </h3>
                    </div>
                    {/* External link button */}
                    <a
                      href={project.link}
                      class="group inline-flex items-center justify-center w-16 h-16 border border-black hover:bg-black hover:text-white transition-all duration-300 ml-4 flex-shrink-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        class="w-8 h-8 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Dashed separator - only show if not the last project */}
              {index() < projectsData.length - 1 && (
                <div class="flex justify-center mt-16">
                  <div class="w-full border-b border-dashed border-gray-400"></div>
                </div>
              )}
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

// Export sample project data
export const projectsData = [
  {
    id: 1,
    name: "CLAYO",
    date: "2025",
    type: "AI project",
    description: "an ai call assistant",
    image: "/projects/clayo.png",
    link: "https://clayo.ai/"
  },
  {
    id: 2,
    name: "POKEMON LEGENDS",
    date: "2025",
    type: "Game development",
    description: "a pokemon game written in phaserjs and rust",
    image: "/projects/pkmn.png",
    link: "https://github.com/milan090/pokemonlegends-app"
  },
  {
    id: 3,
    name: "PHYSICS LAB",
    date: "2021",
    type: "Web application",
    description: "vuejs physics demonstration project",
    image: "/projects/physics.png",
    link: "https://physics-lab.vercel.app/"
  },
  {
    id: 4,
    name: "ENCY",
    date: "2021",
    type: "AI project",
    description: "an ai writing assistant written before gpt-3.5 released (2021)",
    image: "/projects/ency.png",
    link: "https://github.com/milan090/ency"
  }
];

export default ProjectsSection;
