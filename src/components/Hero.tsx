import { animate, spring, stagger } from "motion"
import { For, createEffect, type Component } from "solid-js";

const Hero: Component = () => {
  return (
    <div id="hero" class="w-screen h-screen relative flex flex-col justify-end">
      <div class="relative">
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
          }`}
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
  let textLinesBgEl: HTMLDivElement[] = [];
  const textLines = [
    "Hey there! I'm",
    "Fullstack Developer",
    "from Kerala, India",
  ];

  createEffect(() => {
    animate(
      textLinesEl,
      { y: ["35px", 0] },
      {
        delay: stagger(0.12),
        duration: 0.6,
        easing: "ease-out"
      }
    );

    animate(
      textLinesBgEl,
      { y: [0, 30] },
      {
        delay: stagger(0.12),
        duration: 0.8,
        easing: "ease-out"
      }
    );
  });

  return (
    <div class="relative font-modernist text-[22px] font-thin">
      <For each={textLines}>
        {(line, index) => (
          <div class="relative" style={{ "z-index": 1 + index() }}>
            <div ref={(el) => (textLinesEl[index()] = el!)} class="relative">
              {line}
            </div>
            <div
              class="w-full h-20 absolute bg-white z-10 top-0"
              ref={(el) => (textLinesBgEl[index()] = el!)}
            ></div>
          </div>
        )}
      </For>
    </div>
  );
};

const ContactMe: Component = () => {
  let contactMeEl: HTMLDivElement;
  let hideBgEl: HTMLDivElement;

  createEffect(() => {
    animate(
      contactMeEl,
      { x: ["-20px", 0] },
      {
        delay: 1.9,
        duration: 0.8,
        easing: "ease-out"
      }
    );

    animate(
      hideBgEl,
      { x: [-20, -200] },
      {
        delay: 1.9,
        duration: 0.8,
        easing: spring({
          damping: 12,
          stiffness: 28.8,
          mass: 1
        })
      }
    );
  }
  );

  return (
    <div class="relative font-modernist font-light text-[22px]">
      <div ref={(el) => hideBgEl = el}  class="bg-white z-10 absolute w-[200px] h-10 left-0" />
      <div class="underline underline-offset-4"
        ref={(el) => contactMeEl = el}
      >
        contact me
      </div>
    </div>
  )
}

export default Hero;