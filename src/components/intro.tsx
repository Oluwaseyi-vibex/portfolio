import { useEffect, useRef } from "react";
import gsap from "gsap";

const Intro = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const introLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      if (introRef.current) introRef.current.style.display = "none";
      gsap.set("#page", { opacity: 1, visibility: "visible" });
      gsap.set("nav", { clearProps: "all" });
      gsap.set(".hero-heading-line", { clearProps: "all" });
      gsap.set(".hero-cta", { clearProps: "all" });
      return;
    }

    const wordInners = document.querySelectorAll(".word-inner");

    // ── Hard-reset all initial states ──────────────────────────────
    gsap.set(wordInners, { y: "110%" });
    gsap.set(introLineRef.current, { width: 0, opacity: 0 });
    gsap.set(introRef.current, { opacity: 1, display: "flex" });
    gsap.set(curtainRef.current, { scaleY: 0, transformOrigin: "bottom" });
    gsap.set("#page", { opacity: 0, visibility: "hidden" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Step 1 — words stagger in from below
    tl.to(wordInners, {
      y: "0%",
      duration: 0.85,
      stagger: 0.12,
      delay: 0.3,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    })

      // Step 2 — accent line draws in
      .to(
        introLineRef.current,
        { width: "280px", opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )

      // Step 3 — hold for reading
      .to({}, { duration: 0.9 })

      // Step 4 — words exit upward
      .to(wordInners, {
        y: "-110%",
        duration: 0.55,
        stagger: 0.07,
        ease: "power2.in",
      })
      .to(introLineRef.current, { opacity: 0, duration: 0.3 }, "<+0.1")

      // Step 5 — curtain wipes up from bottom
      .to(
        curtainRef.current,
        {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 0.55,
          ease: "power3.inOut",
        },
        "-=0.05"
      )

      // Step 6 — curtain peels away from top
      .to(curtainRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.55,
        ease: "power3.inOut",
      })

      // Step 7 — reveal page
      .set("#page", { visibility: "visible" })
      .to("#page", { opacity: 1, duration: 0.01 }, "<")
      .set(introRef.current, { display: "none" })

      // Step 8 — nav slides down from above
      .to(
        "nav",
        { y: "0%", opacity: 1, duration: 0.7, ease: "power3.out" },
        "<+0.05"
      )

      // Step 9 — hero headings slide up from clip
      .to(
        ".hero-heading-line",
        { y: "0%", duration: 0.9, stagger: 0.12, ease: "power3.out" },
        "<+0.1"
      )

      // Step 10 — CTA fades up
      .to(
        ".hero-cta",
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "<+0.2"
      );
  }, []);

  return (
    <>
      {/* Full-screen intro overlay */}
      <div ref={introRef} id="intro">
        <div className="intro-text">
          <span className="word">
            <span className="word-inner">I</span>
          </span>
          <span className="word">
            <span className="word-inner">build</span>
          </span>
          <span className="word">
            <span className="word-inner accent">solutions</span>
          </span>
        </div>
        <div ref={introLineRef} id="introLine" />
      </div>

      {/* Transition curtain */}
      <div ref={curtainRef} id="curtain" />
    </>
  );
};

export default Intro;
