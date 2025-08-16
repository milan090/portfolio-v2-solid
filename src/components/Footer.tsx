import { animate, stagger, inView } from "motion";
import { createEffect, onMount, onCleanup, type Component } from "solid-js";

const Footer: Component = () => {
  let containerRef: HTMLDivElement | undefined;
  let socialLinksRef: HTMLAnchorElement[] = [];
  let copyrightRef: HTMLDivElement | undefined;
  let cvLinkRef: HTMLAnchorElement | undefined;

  onMount(() => {
    if (!containerRef || !copyrightRef || !cvLinkRef) return;

    // Initial state - elements start hidden
    const allElements = [cvLinkRef, ...socialLinksRef, copyrightRef];
    
    const animation = animate(
      allElements,
      {
        y: [20, 0],
        opacity: [0, 1],
      },
      {
        delay: stagger(0.1, { start: 0.2 }),
        duration: 0.8,
        easing: "ease-out",
      }
    );
    animation.pause();

    const controls = inView(
      containerRef,
      () => {
        animation.play();
      },
      {
        amount: 0.3,
      }
    );

    onCleanup(() => {
      animation.cancel();
      controls();
    });
  });

  const socialLinks = [
    { name: "EMAIL", href: "mailto:hello@milan090.me" },
    { name: "GITHUB", href: "https://github.com/milan090" },
    { name: "LINKEDIN", href: "https://www.linkedin.com/in/milan090/" },
    { name: "TWITTER", href: "https://twitter.com/itsmilan090" },
  ];

  return (
    <footer
      ref={containerRef}
      class="h-screen bg-white flex flex-col justify-between p-8 lg:p-16"
    >
      {/* Top Section - Contact Message */}
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-16">
        <div class="font-modernist text-lg lg:text-xl text-gray-700 mb-8 lg:mb-0">
          <div>contact me</div>
          <div class="text-gray-500 mt-2">
            let's collaborate if you're<br />
            interested in working together
          </div>
        </div>
      </div>

      {/* Middle Section - Social Links */}
      <div class="flex-1 flex flex-col justify-center space-y-8 lg:space-y-12">
        {socialLinks.map((link, index) => (
          <a
            ref={(el) => socialLinksRef.push(el)}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-between border-b border-gray-200 pb-4 lg:pb-6 transition-all duration-300 hover:border-black opacity-0"
            style={{ transform: "translateY(20px)" }}
          >
            <span class="font-helvetica text-2xl lg:text-4xl font-light tracking-wide">
              {link.name}
            </span>
            <div class="transform transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                class="lg:w-8 lg:h-8"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom Section - CV and Copyright */}
      <div class="flex flex-col lg:flex-row justify-between items-center pt-8">
        <a
          ref={cvLinkRef}
          href="https://drive.google.com/file/d/1ffRclMFJFVInvM74u2nmu4ekAyAIe4Bl/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="font-helvetica text-2xl lg:text-3xl font-medium underline underline-offset-4 mb-4 lg:mb-0 opacity-0"
          style={{ transform: "translateY(20px)" }}
        >
          CV
        </a>
        <div
          ref={copyrightRef}
          class="font-modernist text-lg lg:text-xl text-gray-700 opacity-0"
          style={{ transform: "translateY(20px)" }}
        >
          © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
