function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".wrapper"),
    smooth: true,
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".wrapper" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".wrapper", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".wrapper").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
locoScroll();

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger-menu");
  const closeMenu = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  // Open menu
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    hamburger.classList.add("hidden");
    closeMenu.classList.remove("hidden");
  });

  // Close menu
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    hamburger.classList.remove("hidden");
    closeMenu.classList.add("hidden");
  });
  //typed JS
  var typed = new Typed("#typed", {
    strings: ["ANURAG PANDEY", "A DEVELOPER", "A DESIGNER", "A CREATOR"],
    typeSpeed: 120,
    backSpeed: 50,
    loop: true,
    showCursor: false,
  });
  // swiper js
  var swiper = new Swiper(".mySwiper", {
    effect: 'coverflow',
    centeredSlides: true,
    loop: true,
    slidesPerView: '4',
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 10,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  });

  let tl = gsap.timeline();

  tl.from("header", {
    y: -20,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "all ease",
  })
    .from("nav a", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      ease: "all ease",
    })
    .from(".hero ,#about,#skills,#projects", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.1,
      stagger: 1,
      ease: "all ease",
    })
    .from(".hero .greet", {
      x: -20,
      opacity: 0,
      duration: 1,
      ease: "all ease",
    })
    .from(".hero .greet2", {
      x: 20,
      opacity: 0,
      duration: 1,
      ease: "all ease",
    })
    .from("#about .education-card", {
      x: 50,
      opacity: 0,
      ease: "all ease in-out",
      duration: 2,
      delay: 1,
      scrollTrigger: {
        trigger: "#about .education-card",
        scroller: ".wrapper", // Use the scroller proxy set up for Locomotive Scroll
        scrub: 0.1,
        start: "top 50%",
        end: "top 10%"
      }
    })
  // .from("#projects",{
  //   x: 50,
  //   opacity: 0,
  //   ease: "all ease in-out",
  //   scrollTrigger: {
  //     trigger: "#projects",
  //     scroller: ".wrapper", // Use the scroller proxy set up for Locomotive Scroll
  //     scrub: 0.1,
  //     markers: true,
  //     pin: true,
  //     start: "top 90%",
  //     end: "top 10%"
  // }
  // })


});


