/* ============================================
   MarketingFlow - Vanilla JavaScript
   Handles all interactions, animations, tabs,
   accordion, sliders (Swiper), and scroll effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ========== PAGE PRELOADER ==========
  var preloader = document.getElementById('page-preloader');
  if (preloader) {
    document.body.style.overflow = 'hidden';
    var minDisplayTime = 1800; // minimum ms to show the logo animation
    var loadStart = Date.now();

    function dismissPreloader() {
      var elapsed = Date.now() - loadStart;
      var remaining = Math.max(0, minDisplayTime - elapsed);
      setTimeout(function () {
        preloader.classList.add('preloader-exit');
        preloader.addEventListener('transitionend', function handler() {
          preloader.remove();
          document.body.style.overflow = '';
          preloader.removeEventListener('transitionend', handler);
        });
      }, remaining);
    }

    if (document.readyState === 'complete') {
      dismissPreloader();
    } else {
      window.addEventListener('load', dismissPreloader);
    }
  }

  // ========== HERO FADE IN ==========
  var heroContainer = document.querySelector('.container.hero');
  if (heroContainer) {
    setTimeout(function () {
      heroContainer.style.opacity = '1';

      // Animate hero social block elements
      var heroDigitalText = document.querySelector('.hero-social-block ._20px-title');
      var heroDivider = document.querySelector('.hero-social-block .hero-title-divider');
      var heroSocialIcons = document.querySelectorAll('.hero-social-block .footer-social-icon');

      if (heroDigitalText) {
        setTimeout(function () { heroDigitalText.style.opacity = '1'; }, 200);
      }
      if (heroDivider) {
        setTimeout(function () { heroDivider.style.width = '40px'; }, 400);
      }
      heroSocialIcons.forEach(function (icon, i) {
        setTimeout(function () {
          icon.style.transform = 'translate3d(0, 0, 0)';
        }, 500 + (i * 100));
      });
    }, 300);
  }

  // ========== SOCIAL PROOF BAR SWIPER ==========
  if (typeof Swiper !== 'undefined') {
    var spbEl = document.querySelector('.spb-swiper');
    if (spbEl) {
      var spbSwiper = new Swiper(spbEl, {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 16,
        speed: 3000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        },
        breakpoints: {
          480: { slidesPerView: 4, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 36 },
          992: { slidesPerView: 5, spaceBetween: 48 },
          1280: { slidesPerView: 6, spaceBetween: 48 }
        }
      });
    }
  }

  // ========== SCROLL ANIMATIONS (IntersectionObserver) ==========
  var animatedElements = document.querySelectorAll('[data-w-id]');
  var scrollObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        // Only animate elements that start with opacity:0
        if (el.style.opacity === '0') {
          el.classList.add('scroll-animated');
        }
        scrollObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(function (el) {
    if (el.style.opacity === '0') {
      scrollObserver.observe(el);
    }
  });

  // ========== NAVBAR SCROLL-DIRECTION SHOW/HIDE (bottom pill) ==========
  var navbar = document.getElementById('navbar');
  var lastScrollY = window.scrollY;
  var scrollTicking = false;
  var scrollThreshold = 8;

  function handleNavbarScroll() {
    var currentScrollY = window.scrollY;
    var delta = currentScrollY - lastScrollY;

    if (delta > scrollThreshold) {
      // Scrolling DOWN — hide navbar
      navbar.classList.add('navbar-hidden');
    } else if (delta < -scrollThreshold) {
      // Scrolling UP — show navbar
      navbar.classList.remove('navbar-hidden');
    }

    // Always show at top of page
    if (currentScrollY <= 10) {
      navbar.classList.remove('navbar-hidden');
    }

    lastScrollY = currentScrollY;
    scrollTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(handleNavbarScroll);
      scrollTicking = true;
    }
  });

  // ========== MOBILE NAV TOGGLE ==========
  var hamburgerMenu = document.querySelector('.hamburger-menu');
  var navMenuWrapper = document.querySelector('.nav-menu-wrapper');
  var closeNavBtn = document.querySelector('.close-navbar-icon');

  if (hamburgerMenu && navMenuWrapper) {
    hamburgerMenu.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      navMenuWrapper.classList.toggle('w--nav-menu-open');
      document.body.style.overflow = navMenuWrapper.classList.contains('w--nav-menu-open') ? 'hidden' : '';
    });
  }

  if (closeNavBtn && navMenuWrapper) {
    closeNavBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      navMenuWrapper.classList.remove('w--nav-menu-open');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav on link click
  if (navMenuWrapper) {
    navMenuWrapper.querySelectorAll('.nav-link-wrapper').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenuWrapper.classList.remove('w--nav-menu-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      // Strip leading / for same-page anchors
      if (href.startsWith('/#')) href = href.substring(1);
      if (href === '#' || !href.startsWith('#')) return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  // ========== TABS SYSTEM (Services & FAQ main tabs) ==========
  function initTabs(tabsContainer) {
    var tabMenu = tabsContainer.querySelector('.w-tab-menu');
    var tabContent = tabsContainer.querySelector('.w-tab-content');
    if (!tabMenu) return;

    var tabLinks = tabMenu.querySelectorAll('.w-tab-link');
    var tabPanes = tabContent ? tabContent.querySelectorAll('.w-tab-pane') : [];

    tabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var tabId = this.getAttribute('data-w-tab');

        // Update tab links
        tabLinks.forEach(function (l) {
          l.classList.remove('w--current');
        });
        this.classList.add('w--current');

        // Update tab panes
        tabPanes.forEach(function (pane) {
          pane.classList.remove('w--tab-active');
          if (pane.getAttribute('data-w-tab') === tabId) {
            pane.classList.add('w--tab-active');
          }
        });
      });
    });
  }

  // Initialize all tab components (exclude FAQ accordion wrappers)
  document.querySelectorAll('.w-tabs').forEach(function (tabs) {
    if (!tabs.classList.contains('faq-dropdown-wrapper')) {
      initTabs(tabs);
    }
  });

  // ========== FAQ ACCORDION (using tabs as accordion) ==========
  function initAccordion(container) {
    var accordionLinks = container.querySelectorAll('.faq-accordion');

    // Set initial max-height on the already-open item
    accordionLinks.forEach(function (link) {
      var body = link.querySelector('.accordion-body');
      if (body && link.classList.contains('w--current')) {
        body.style.maxHeight = (body.scrollHeight + 20) + 'px';
      }
    });

    accordionLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var clicked = this;
        var isActive = clicked.classList.contains('w--current');

        // Close all open items in this container
        accordionLinks.forEach(function (l) {
          var body = l.querySelector('.accordion-body');
          if (body && l.classList.contains('w--current')) {
            // Pin to current scrollHeight so transition has a start value
            body.style.maxHeight = body.scrollHeight + 'px';
            body.offsetHeight; // force reflow
            body.style.maxHeight = '0';
          }
          l.classList.remove('w--current');
        });

        // Open clicked if it was closed
        if (!isActive) {
          clicked.classList.add('w--current');
          var body = clicked.querySelector('.accordion-body');
          if (body) {
            body.style.maxHeight = (body.scrollHeight + 20) + 'px';
          }
        }
      });
    });
  }

  // Init FAQ accordions
  document.querySelectorAll('.faq-dropdown-wrapper').forEach(function (wrapper) {
    initAccordion(wrapper);
  });

  // ========== TESTIMONIALS SWIPER ==========
  if (typeof Swiper !== 'undefined') {
    var testimonialEl = document.querySelector('.testimonial-slider');
    var testimonialSwiper = null;

    function initTestimonialSwiper() {
      if (testimonialSwiper) return;
      testimonialSwiper = new Swiper(testimonialEl, {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        spaceBetween: 24,
        speed: 650,
        grabCursor: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          480: {
            slidesPerView: 2
          },
          992: {
            slidesPerView: 3
          },
          1400: {
            slidesPerView: 4
          }
        }
      });
    }

    // Init immediately — also restart autoplay on visibility
    initTestimonialSwiper();

    var testimonialSection = document.querySelector('#testimonials');
    if (testimonialSection) {
      var swiperObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && testimonialSwiper) {
            testimonialSwiper.autoplay.start();
          }
        });
      }, { threshold: 0.1 });
      swiperObserver.observe(testimonialSection);
    }
  }

  // ========== PROJECTS MOBILE SWIPER ==========
  if (typeof Swiper !== 'undefined' && window.innerWidth <= 767) {
    var projectsSwiperEl = document.querySelector('.projects-swiper');
    if (projectsSwiperEl) {
      new Swiper(projectsSwiperEl, {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        spaceBetween: 16,
        speed: 650,
        grabCursor: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.projects-swiper-pagination',
          clickable: true
        }
      });
    }
  }

  // ========== FANCYBOX ==========
  if (typeof Fancybox !== 'undefined') {
  }

  // ========== HORIZONTAL SCROLL (Projects Section) ==========
  function initHorizontalScroll() {
    var section = document.querySelector('.horizontal-slider-section');
    if (!section || window.innerWidth < 992) return;

    var camera = section.querySelector('.camera');
    var frame = section.querySelector('.frame');
    var frameReverse = section.querySelector('.frame-reverse');
    if (!frame) return;

    var items = frame.querySelectorAll('.item');
    var totalWidth = 0;
    items.forEach(function (item) {
      totalWidth += item.scrollWidth + 10;
    });

    var circleWrapper = section.querySelector('.circle-inside-wrapper');
    var maxBorder = 8;

    window.addEventListener('scroll', function () {
      var rect = section.getBoundingClientRect();
      var sectionHeight = section.offsetHeight;
      var viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        var scrollProgress = Math.max(0, -rect.top) / (sectionHeight - viewportHeight);
        scrollProgress = Math.min(1, Math.max(0, scrollProgress));

        var maxTranslate = totalWidth - window.innerWidth;
        var translateX = scrollProgress * maxTranslate;

        frame.style.transform = 'translateX(' + (-translateX) + 'px)';

        if (frameReverse) {
          frameReverse.style.transform = 'translateX(' + (translateX - maxTranslate) + 'px)';
        }

        // Circle border grows from 0px to maxBorder on scroll
        if (circleWrapper) {
          var borderWidth = Math.round(scrollProgress * maxBorder);
          circleWrapper.style.borderWidth = borderWidth + 'px';
        }
      } else if (circleWrapper) {
        circleWrapper.style.borderWidth = '0px';
      }
    });
  }

  initHorizontalScroll();

  // Reinitialize on resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      initHorizontalScroll();
    }, 250);
  });

  // ========== COUNTER ANIMATION ==========
  function animateCounters() {
    var counterWrappers = document.querySelectorAll('.animated-counter');

    // Set initial states: normal wrappers start at bottom (showing 0), reverse start at top (showing 0)
    counterWrappers.forEach(function (counter) {
      var normalWrappers = counter.querySelectorAll('.counter-number-wrapper-2');
      normalWrappers.forEach(function (wrapper) {
        var digits = wrapper.querySelectorAll('.counter-number-text');
        // Start at bottom position showing "0" (last digit)
        wrapper.style.transform = 'translateY(-' + ((digits.length - 1) * 48) + 'px)';
      });
    });

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var counter = entry.target;

          // Normal wrappers: animate from bottom (0) to top (target digit = first child)
          var normalWrappers = counter.querySelectorAll('.counter-number-wrapper-2');
          normalWrappers.forEach(function (wrapper) {
            wrapper.style.transform = 'translateY(0)';
          });

          // Reverse wrappers: animate from top (0) to bottom (target digit = last child)
          var reverseWrappers = counter.querySelectorAll('.counter-number-wrapper-reverse-2');
          reverseWrappers.forEach(function (wrapper) {
            var digits = wrapper.querySelectorAll('.counter-number-text');
            var totalOffset = (digits.length - 1) * 48;
            wrapper.style.transform = 'translateY(-' + totalOffset + 'px)';
          });

          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counterWrappers.forEach(function (wrapper) {
      counterObserver.observe(wrapper);
    });
  }

  animateCounters();

  // ========== WCU ICON STROKE-DRAW SETUP ==========
  (function () {
    var icons = document.querySelectorAll('.wcu-card__icon svg');
    icons.forEach(function (svg) {
      var stroked = svg.querySelectorAll('rect[stroke], circle[stroke], path[stroke]');
      stroked.forEach(function (el, i) {
        var len = 0;
        try {
          len = el.getTotalLength();
        } catch (e) {
          // rect/circle fallback: approximate perimeter
          if (el.tagName === 'rect') {
            var w = parseFloat(el.getAttribute('width')) || 0;
            var h = parseFloat(el.getAttribute('height')) || 0;
            len = 2 * (w + h);
          } else if (el.tagName === 'circle') {
            var r = parseFloat(el.getAttribute('r')) || 0;
            len = 2 * Math.PI * r;
          } else {
            len = 200;
          }
        }
        len = Math.ceil(len);
        el.style.setProperty('--dash-length', len);
        // Stagger each element slightly
        el.style.transitionDelay = (i * 0.08) + 's';
      });
    });
  })();

  // ========== ABOUT CARD ICON STROKE-DRAW SETUP ==========
  (function () {
    var icons = document.querySelectorAll('.about-card__icon svg');
    icons.forEach(function (svg) {
      var stroked = svg.querySelectorAll('rect[stroke], circle[stroke], path[stroke], line[stroke]');
      stroked.forEach(function (el, i) {
        var len = 0;
        try {
          len = el.getTotalLength();
        } catch (e) {
          if (el.tagName === 'rect') {
            var w = parseFloat(el.getAttribute('width')) || 0;
            var h = parseFloat(el.getAttribute('height')) || 0;
            len = 2 * (w + h);
          } else if (el.tagName === 'circle') {
            var r = parseFloat(el.getAttribute('r')) || 0;
            len = 2 * Math.PI * r;
          } else if (el.tagName === 'line') {
            var x1 = parseFloat(el.getAttribute('x1')) || 0;
            var y1 = parseFloat(el.getAttribute('y1')) || 0;
            var x2 = parseFloat(el.getAttribute('x2')) || 0;
            var y2 = parseFloat(el.getAttribute('y2')) || 0;
            len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
          } else {
            len = 200;
          }
        }
        len = Math.ceil(len);
        el.style.setProperty('--dash-length', len);
        el.style.transitionDelay = (i * 0.06) + 's';
      });
    });
  })();

  // ========== ABOUT SEO SVG SCROLL TRIGGER + REPEATING DRAW CYCLE ==========
  (function () {
    var visual = document.querySelector('.about-seo-visual');
    if (!visual) return;

    var DRAW_DURATION = 2800;   // time for all entrance anims to finish
    var HOLD_DURATION = 2200;   // pause at fully-drawn state
    var FADE_DURATION = 1200;   // opacity fade-out (matches CSS transition)
    var RESET_GAP     = 100;    // brief gap before next draw cycle

    function startDrawCycle() {
      visual.classList.remove('seo-paused');
      visual.classList.remove('seo-redraw');
      visual.classList.add('seo-animate');

      setTimeout(function () {
        // Fade out smoothly
        visual.classList.add('seo-redraw');

        setTimeout(function () {
          // Reset — remove animate so all forwards anims revert to initial state
          visual.classList.remove('seo-animate');

          setTimeout(function () {
            // Remove redraw (opacity already 0) and start fresh cycle
            visual.classList.remove('seo-redraw');
            startDrawCycle();
          }, RESET_GAP);
        }, FADE_DURATION);
      }, DRAW_DURATION + HOLD_DURATION);
    }

    var seoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          startDrawCycle();
          seoObserver.unobserve(visual);
        }
      });
    }, { threshold: 0.3 });

    seoObserver.observe(visual);
  })();

  // ========== HOW IT WORKS — TIMELINE SCROLL ENTRANCE ==========
  (function () {
    var timeline = document.querySelector('.hiw-timeline');
    if (!timeline) return;

    // Calculate arrow stroke lengths
    var arrows = timeline.querySelectorAll('.hiw-step__arrow path');
    arrows.forEach(function (p) {
      var len = 0;
      try { len = p.getTotalLength(); } catch (e) { len = 42; }
      len = Math.ceil(len);
      p.style.setProperty('--arrow-len', len);
    });

    var hiwObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animated');
          hiwObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    hiwObserver.observe(timeline);
  })();

  // ========== WCU CARD AUTO-HOVER CYCLE ==========
  (function () {
    var cards = document.querySelectorAll('.wcu-card');
    if (cards.length < 2) return;

    var current = 0;
    var intervalId = null;
    var userHovering = false;

    function clearActive() {
      cards.forEach(function (c) { c.classList.remove('wcu-card--active'); });
    }

    function showNext() {
      clearActive();
      cards[current].classList.add('wcu-card--active');
      current = (current + 1) % cards.length;
    }

    function startCycle() {
      if (intervalId) return;
      showNext();
      intervalId = setInterval(showNext, 2500);
    }

    function stopCycle() {
      clearInterval(intervalId);
      intervalId = null;
      clearActive();
    }

    // Pause auto-cycle when user hovers any card
    cards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        userHovering = true;
        stopCycle();
      });
      card.addEventListener('mouseleave', function () {
        userHovering = false;
        // Resume after a short delay
        setTimeout(function () {
          if (!userHovering && sectionVisible) startCycle();
        }, 800);
      });
    });

    // Only run when section is in view
    var sectionVisible = false;
    var wcuSection = document.getElementById('why-choose-us');
    if (wcuSection) {
      var wcuObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          sectionVisible = entry.isIntersecting;
          if (sectionVisible && !userHovering) {
            current = 0;
            startCycle();
          } else if (!sectionVisible) {
            stopCycle();
          }
        });
      }, { threshold: 0.15 });
      wcuObserver.observe(wcuSection);
    }
  })();

  // ========== SERVICE CARDS SCROLL REVEAL ==========
  (function () {
    var serviceCards = document.querySelectorAll('.testimonial-card-wrapper .tab-link-no-css');
    if (!serviceCards.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var card = entry.target;
          var index = Array.prototype.indexOf.call(serviceCards, card);
          setTimeout(function () {
            card.classList.add('sv-visible');
          }, index * 150);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.15 });

    serviceCards.forEach(function (card) {
      observer.observe(card);
    });
  })();

  // ========== TESTIMONIALS MOUSE GLOW ==========
  (function () {
    var section = document.querySelector('#testimonials');
    if (!section) return;

    var glow = document.createElement('div');
    glow.className = 'tm-mouse-glow';
    section.appendChild(glow);

    section.addEventListener('mousemove', function (e) {
      var rect = section.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top = (e.clientY - rect.top) + 'px';
    });
  })();

  // ========== CONTACT FORM ==========
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var successMsg = contactForm.closest('.contact-form-wrapper').querySelector('.success-message');
      var errorMsg = contactForm.closest('.contact-form-wrapper').querySelector('.error-message');

      if (successMsg) {
        successMsg.style.display = 'block';
        contactForm.reset();
        setTimeout(function () {
          successMsg.style.display = 'none';
        }, 5000);
      }
    });
  }

  // ========== NEWSLETTER FORM ==========
  var newsletterForm = document.querySelector('.newsletter .form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var successMsg = newsletterForm.parentElement.querySelector('.success-message');
      if (successMsg) {
        successMsg.style.display = 'block';
        newsletterForm.reset();
        setTimeout(function () {
          successMsg.style.display = 'none';
        }, 5000);
      }
    });
  }

  // ========== NAV DROPDOWN (Desktop) ==========
  var dropdowns = document.querySelectorAll('.nav-dropdown-wrapper');
  dropdowns.forEach(function (dropdown) {
    var toggle = dropdown.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Mobile: click to toggle
      toggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // ========== PREMIUM CURSOR FOLLOWER ==========
  (function () {
    var follower = document.getElementById('cursor-follower');
    var dot = document.getElementById('cursor-dot');
    var ring = document.getElementById('cursor-ring');
    var glow = document.getElementById('cursor-glow');

    if (!follower || !dot || !ring || !glow) return;

    // Skip on touch devices
    if ('ontouchstart' in window && window.matchMedia('(hover: none)').matches) {
      follower.style.display = 'none';
      return;
    }

    var mouseX = -100, mouseY = -100;
    var dotX = -100, dotY = -100;
    var ringX = -100, ringY = -100;
    var glowX = -100, glowY = -100;
    var isVisible = false;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        follower.style.opacity = '1';
        dotX = ringX = glowX = mouseX;
        dotY = ringY = glowY = mouseY;
      }
    });

    document.addEventListener('mouseleave', function () {
      isVisible = false;
      follower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
      isVisible = true;
      follower.style.opacity = '1';
    });

    // Hover detection for interactive elements
    var hoverTargets = 'a, button, [role="button"], input, textarea, select, .primary-button, .nav-link-wrapper, .hamburger-menu, .tab-link-no-css, .faq-accordion, .footer-social-icon, .submenu-block';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverTargets)) {
        follower.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverTargets)) {
        follower.classList.remove('cursor-hover');
      }
    });

    // Smooth animation loop
    follower.style.opacity = '0';

    function animateCursor() {
      // Dot follows closely (fast)
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;

      // Ring follows with medium lag
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      // Glow follows with heavy lag
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';

      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';

      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';

      requestAnimationFrame(animateCursor);
    }

    requestAnimationFrame(animateCursor);
  })();

  // ========== NAV SCROLL SPY (active section highlighting) ==========
  (function () {
    var navLinks = document.querySelectorAll('.nav-menu > .nav-link-wrapper');
    if (!navLinks.length) return;

    // Build map: sectionId → nav link element
    var linkMap = {};
    var sectionIds = [];
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var id = href.replace(/^\/?#/, '');
      if (id && document.getElementById(id)) {
        linkMap[id] = link;
        sectionIds.push(id);
      }
    });

    // Also track contact section for the button (but don't style the button)
    var contactSection = document.getElementById('contact');

    var currentActive = null;

    function setActive(id) {
      if (currentActive === id) return;
      // Remove previous
      navLinks.forEach(function (link) {
        link.classList.remove('nav-active');
      });
      // Set new
      if (id && linkMap[id]) {
        linkMap[id].classList.add('nav-active');
      }
      currentActive = id;
    }

    // Use IntersectionObserver with threshold to detect which section is most visible
    var visibleSections = {};

    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        if (entry.isIntersecting) {
          visibleSections[id] = entry.intersectionRatio;
        } else {
          delete visibleSections[id];
        }
      });

      // Pick the section closest to the top of viewport among visible ones
      var bestId = null;
      var bestTop = Infinity;
      for (var id in visibleSections) {
        var el = document.getElementById(id);
        if (el) {
          var rect = el.getBoundingClientRect();
          var distance = Math.abs(rect.top);
          if (distance < bestTop) {
            bestTop = distance;
            bestId = id;
          }
        }
      }

      // At page top, default to hero
      if (window.scrollY < 100) {
        bestId = 'hero';
      }

      setActive(bestId);
    }, {
      threshold: [0, 0.1, 0.2, 0.3, 0.5],
      rootMargin: '-80px 0px -30% 0px'
    });

    // Observe all sections that have nav links
    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spyObserver.observe(section);
    });

    // Also observe contact for completeness (no nav-link but good for clearing)
    if (contactSection && !linkMap['contact']) {
      spyObserver.observe(contactSection);
    }

    // Set initial active on load
    setActive('hero');
  })();

});
