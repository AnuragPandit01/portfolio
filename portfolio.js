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
  const header = document.getElementById('main-header');
  const hamburgerBtn = document.getElementById('hamburger-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerLines = document.querySelectorAll('.hamburger-line');
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  // Handle scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('py-2', 'shadow-lg', 'bg-[#1a1b1b]');
      header.classList.remove('py-4', 'bg-[#1a1b1b]/95');
    } else {
      header.classList.add('py-4', 'bg-[#1a1b1b]/95');
      header.classList.remove('py-2', 'shadow-lg', 'bg-[#1a1b1b]');
    }
  });
  
  // Handle mobile menu toggle
  let isMenuOpen = false;
  hamburgerBtn.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      mobileMenu.classList.remove('-right-full');
      mobileMenu.classList.add('right-0');
      
      // Transform hamburger to X
      hamburgerLines[0].classList.add('rotate-45', 'translate-y-2');
      hamburgerLines[1].classList.add('opacity-0');
      hamburgerLines[2].classList.add('-rotate-45', '-translate-y-2');
    } else {
      mobileMenu.classList.remove('right-0');
      mobileMenu.classList.add('-right-full');
      
      // Transform X back to hamburger
      hamburgerLines[0].classList.remove('rotate-45', 'translate-y-2');
      hamburgerLines[1].classList.remove('opacity-0');
      hamburgerLines[2].classList.remove('-rotate-45', '-translate-y-2');
    }
  });
  
  // Close mobile menu when clicking on a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('right-0');
      mobileMenu.classList.add('-right-full');
      
      hamburgerLines[0].classList.remove('rotate-45', 'translate-y-2');
      hamburgerLines[1].classList.remove('opacity-0');
      hamburgerLines[2].classList.remove('-rotate-45', '-translate-y-2');
      
      isMenuOpen = false;
    });
  });
  
  // Active link highlighting based on scroll
  window.addEventListener('scroll', function() {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active', 'text-[#69a7f8]', 'after:scale-x-100');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active', 'text-[#69a7f8]', 'after:scale-x-100');
      }
    });
    
    mobileLinks.forEach(link => {
      link.classList.remove('active', 'bg-[#69a7f8]/10', 'pl-6');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active', 'bg-[#69a7f8]/10', 'pl-6');
      }
    });
  });
  
  // Theme toggle functionality with local storage
  let isDarkMode = localStorage.getItem('theme') === 'dark'; // Check saved theme in local storage

  function applyTheme() {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      themeToggleMobile.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
      document.documentElement.classList.remove('dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      themeToggleMobile.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Save theme to local storage
    applyTheme();
  }

  // Apply theme on page load
  applyTheme();

  themeToggle.addEventListener('click', toggleTheme);
  themeToggleMobile.addEventListener('click', toggleTheme);
  // typed js
  new Typed('#typed', {
    strings: ['Anurag', 'a Developer', 'a Designer', 'a Creator', 'a Coder'],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true,
    backDelay: 1500,
    showCursor: false,
  });
  // swiper js
  var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // Mobile
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // Tablet
      640: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // Desktop
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });

  let tl = gsap.timeline();

    tl.from(".hero ,#about,#skills,#projects", {
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


