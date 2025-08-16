import { animate, spring, stagger } from "motion"
import { For, createEffect, type Component } from "solid-js";

import ShaderBackground from "./ShaderBackground";
import ClientOnly from "./ClientOnly";

const Hero: Component = () => {
  return (
    <div id="hero" class="w-screen h-screen relative flex flex-col justify-end overflow-hidden">
      <ClientOnly>
        <ShaderBackground />
      </ClientOnly>
      <div class="relative z-10">
        <Name value="MILAN" />
      </div>
      <div class="absolute top-[30vh] right-[20vw]">
        <HeyThere />
      </div>
      <div class="absolute top-12 right-10">
        <ContactMe />
      </div>
    </div>
  );
};
const Name: Component<{ value: string }> = ({ value }) => {
  let lettersEl: HTMLSpanElement[] = [];

  createEffect(() => {
    animate(
      lettersEl,
      { y: ["350vh", 0] },
      {
        delay: stagger(0.04, { start: 1.4 }),
        duration: 1.2,
        easing: spring({
          damping: 10,
          stiffness: 28,
          mass: 1
        })
      }
    )
  }, [value]);

  return (
    <div class="font-helvetica text-[35vw] lg:text-[350px] font-medium relative flex -tracking-[0.1em] leading-[0.9]">
      {value.split("").map((letter, index) => (
        <span
          class={`relative ${letter == "A" ? "-tracking-[0.05em]" : ""} ${
            letter == "L" ? "tracking-[0.02em]" : ""
          } text-transparent`}
          style={{
            "-webkit-text-stroke": "3.14px black",
            // "-webkit-text-stroke": "2px white"
          }}
          ref={(el) => (lettersEl[index] = el)}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

const HeyThere: Component = () => {
  let textLinesEl: HTMLDivElement[] = [];
  const textLines = [
    "Hey there! I'm",
    "Fullstack Developer",
    "from Kerala, India",
  ];

  createEffect(() => {
    // Animate the text sliding upward.
    animate(
      textLinesEl,
      { y: ["35px", 0] },
      {
        delay: stagger(0.12),
        duration: 0.6,
        easing: "ease-out",
      }
    );

    // Animate the clip-path to reveal the text.
    animate(
      textLinesEl,
      { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"] },
      {
        delay: stagger(0.12),
        duration: 0.8,
        easing: "ease-out",
        
      }
    );
  });

  return (
    <div class="relative font-modernist text-[22px] font-thin overflow-hidden">
      <For each={textLines}>
        {(line, index) => (
          <div class="relative" style={{ "z-index": 1 + index() }}>
            <div
              ref={(el) => (textLinesEl[index()] = el!)}
              class="relative"
              // Start fully clipped (hidden) on the right.
              style={{ "clip-path": "inset(0 100% 0 0)" }}
            >
              {line}
            </div>
          </div>
        )}
      </For>
    </div>
  );
};


const ContactMe: Component = () => {
  let contactMeEl: HTMLDivElement;

  createEffect(() => {
    animate(
      contactMeEl,
      {
        // Animate a horizontal slide along with a clip-path reveal.
        x: ["-20px", 0],
        clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)"]
      },
      {
        delay: 1.9,
        duration: 0.8,
        easing: "ease-out"
      }
    );
  });

  return (
    <div class="relative font-modernist font-light text-[22px] overflow-hidden cursor-pointer">
      <div 
        class="underline underline-offset-4"
        ref={(el) => contactMeEl = el}
        // Ensure the text starts hidden by clipping it.
        style={{ "clip-path": "inset(0 100% 0 0)" }}
      >
        contact me
      </div>
    </div>
  );
}


export default Hero;