function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main")," element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locoScroll();

function cursorEffect() {
  const page1Overlay = document.querySelector("#overlay");
  const cursor = document.querySelector("#cursor");

  page1Overlay.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });

  page1Overlay.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });

  page1Overlay.addEventListener("mousemove", (dats) => {
    gsap.to(cursor, {
      x: dats.x,
      y: dats.y,
    });
  });
}

cursorEffect();

function page2Effect() {
  const paragraphs = document.querySelectorAll("#page2 #page2-content");
  paragraphs.forEach((paragraph) => {
    const lines = paragraph.textContent
      .split("\n")
      .filter((line) => line.trim() !== "");
    paragraph.innerHTML = lines
      .map(
        (line) =>
          `<span class="line" style="display:inline-block" >${line}</span>`
      )
      .join("\n");
  });

  gsap.from(["#page2 #page2-title h3", "#page2 #page2-content .line"], {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.7,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 70%",
      end: "top 67%",
      scrub: 2,
    },
  });
}

page2Effect();

function sliderEffect() {
  var swiper = new Swiper(".mySwiper", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    speed: 20000,
    slidesPerView: "auto",
  });
}

sliderEffect();

function loadingEffect() {
  const tl = gsap.timeline();

  tl.from("#loader span", {
    x: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    stagger: 0.3,
  });

  tl.to("#loader span", {
    x: -50,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    stagger: 0.3,
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.5,
    delay: 0.2,
    stagger: 0.2,
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from("#page1 #overlay h1 span", {
    y: 40,
    opacity: 0,
    duration: 0.2,
    stagger: 0.1,
  });
}

loadingEffect();

gsap.from("#page3 #page3-top h2 .underline", {
  y: 35,
  opacity: 0,
  duration: 0.6,
  delay: 0.3,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "top 60%",
    end: "top 50%",
    scrub: 2,
  },
});

function page5Effect() {
  gsap.from(["#page5 #page5-title h3", "#page5 #page5-content"], {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.7,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#page5",
      scroller: "#main",
      start: "top 70%",
      end: "top 67%",
      scrub: 2,
    },
  });
}

page5Effect();

function page6Effect() {
  const tl = gsap.timeline();

  tl.from("#page6 #page6-top", {
    y: -100,
    opacity: 0,
    duration: 1,
    delay: 0.7,
    scrollTrigger: {
      trigger: "#page6",
      scroller: "#main",
      start: "top 70%",
      end: "top 67%",
      scrub: 2,
    },
  });

  tl.from("#page6 #info #page6-bottom h1 span", {
    y: -100,
    opacity: 0,
    duration: 1.5,
    delay: 1,
    stagger: 0.4,
    scrollTrigger: {
      trigger: "#page6",
      scroller: "#main",
      start: "top 30%",
      end: "top 10%",
      scrub: 2,
    },
  });
}

page6Effect();
