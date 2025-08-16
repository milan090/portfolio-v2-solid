import { animate, inView, stagger } from "motion";
import {
  For,
  createEffect,
  onCleanup,
  onMount,
  type Component,
} from "solid-js";
const extremeSlowEndEasing = (t: number) => {
  // Move quickly until t = 0.8, then slow down dramatically
  if (t <= 0.8) {
    // Ease in-out for the first 80% of the time
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  } else {
    // Slow down dramatically for the last 20% of the time
    return 0.9 + (t - 0.8) * 0.5; // Move only 10% of remaining distance
  }
};
const ICreateSection: Component = () => {
  let containerRef: HTMLDivElement | undefined;
  let firstRectRef: HTMLDivElement | undefined;
  let firstRectShadowRef: HTMLDivElement | undefined;
  let secondRectRef: HTMLDivElement | undefined;
  let secondRectShadowRef: HTMLDivElement | undefined;

  let firstText: HTMLSpanElement | undefined;
  let secondText: HTMLSpanElement[] = [];
  let thirdText: HTMLSpanElement | undefined;

  onMount(() => {
    if (
      !containerRef ||
      !firstRectRef ||
      !firstRectShadowRef ||
      !secondRectRef ||
      !secondRectShadowRef ||
      !firstText ||
      !secondText ||
      !thirdText
    )
      return;
    const bgAnimation = animate(
      containerRef,
      {
        backgroundImage: [
          "radial-gradient(104.33% 104.33% at 48.47% 97.93%, #000 0%, #000 53.53%, #fff 100%)",
          "radial-gradient(104.33% 104.33% at 48.47% 97.93%, #000 0%, #020202 53.53%, #fff 100%)",
        ],
        backgroundPosition: ["center 0%", "center 50%"],
      },
      { duration: 1.5, easing: [0.22, 0.03, 0.26, 1] }
    );
    bgAnimation.pause();

    const firstRectAnimation = animate(
      firstRectRef,
      {
        width: ["100vw", "90vw", "60vw", firstRectShadowRef.clientWidth + "px"],
        x: ["-80vw", "0px"],
      },
      {
        duration: 1,
        delay: 1,
        easing: "ease-in-out",
        offset: [0, 0.25, 0.4, 1],
      }
    );
    firstRectAnimation.pause();

    const secondRectAnimation = animate(
      secondRectRef,
      {
        width: [
          "100vw",
          "90vw",
          "60vw",
          secondRectShadowRef.clientWidth + "px",
        ],
        x: ["80vw", "0px"],
      },
      {
        duration: 1,
        delay: 1,
        easing: "ease-in-out",
        offset: [0, 0.25, 0.4, 1],
      }
    );
    secondRectAnimation.pause();

    const firstTextAnimation = animate(
      firstText,
      {
        x: ["-100vw", "0px"],
      },
      {
        duration: 0.63,
        delay: 1.05,
        // easing: "ease-out",
        easing: "ease-in-out",
      }
    );
    firstTextAnimation.pause();

    const thirdTextAnimation = animate(
      thirdText,
      {
        x: ["100vw", "0px"],
      },
      {
        duration: 0.5,
        delay: 1.05,
        // easing: "ease-out",
        easing: "ease-in-out",
      }
    );
    thirdTextAnimation.pause();

    const secondTextAnimation = animate(
      secondText,
      {
        y: ["-100%", "0%"],
        clipPath: ["inset(0 0 100% 0)", "inset(0 0 0px 0)"],
      },
      {
        delay: stagger(0.05, {
          start: 1.29 
        }),
        duration: 0.5,
        // easing: spring({ stiffness: 100, damping: 15 })
      }
    );
    secondTextAnimation.pause();

    const controls = inView(
      containerRef,
      ({ target }) => {
        bgAnimation.play();
        firstRectAnimation.play();
        secondRectAnimation.play();
        firstTextAnimation.play();
        thirdTextAnimation.play();
        secondTextAnimation.play();
      },
      {
        amount: 0.1,
      }
    );

    onCleanup(() => {
      bgAnimation.cancel();
      controls();
    });
  });

  return (
    <div
      ref={containerRef}
      class="h-screen flex justify-center pt-20"
      style={{
        // "min-height": "100vh",
        // "background-image": "radial-gradient(104.33% 104.33% at 48.47% 97.93%, #666 0%, #000 53.53%, #666 100%)",
        "background-size": "100% 200%",
        "background-position": "center 100%",
      }}
    >
      <div class="font-helvetica-compressed text-[15vw] leading-[1.0] flex flex-col text-white opacity0">
        <div class="flex gap-x-1 relative">
          <span ref={firstText}>I BUILD</span>
          <div
            ref={firstRectShadowRef}
            class="flex-1 h-[72%] relative bg-red-500 opacity-0"
          ></div>
          <div
            ref={firstRectRef}
            class="flex-1 h-[72%]  absolute bg-white w-screen right-0"
          ></div>
        </div>
        <div class="relative">
          <span class="absolute top-0">
            <For each={"SOFTWAREFOR".split("")}>
              {(char, index) => (
                <span
                  ref={(el) => secondText.push(el)}
                  class="inline-block relative top-0 text-transparent"
                  style={{
                    left: index() > 5 ? `${0.15}em` : "0",
                    "clip-path": "inset(0 0 100% 0)",
                    "will-change": "clip-path, transform",
                    "-webkit-text-stroke": "2px white",
                  }}
                >
                  {char}
                </span>
              )}
            </For>
          </span>
          <span class="opacity-0">SOFTWARE FOR</span>
        </div>
        <div class="flex gap-x-1 relative">
          {/* <div ref={secondRectRef} class="flex-1 h-[78%] bottom-2 relative bg-white"></div> */}
          <div
            ref={secondRectShadowRef}
            class="flex-1 h-[72%] relative bg-red-500 opacity-0"
          ></div>
          <div
            ref={secondRectRef}
            class="flex-1 h-[72%] absolute bg-white w-screen left-0"
          ></div>
          <span ref={thirdText} class="text-right">
            THE WEB
          </span>
        </div>
      </div>
    </div>
  );
};

export default ICreateSection;
