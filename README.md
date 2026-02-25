# Capsule Digital — Landing Page

Sydney's full-service digital marketing agency website.

## Tech Stack

- **HTML5** — Semantic, single-page layout
- **CSS3** — Custom properties, keyframe animations, responsive (mobile-first)
- **JavaScript** — Vanilla JS, IntersectionObserver, scroll-driven animations
- **Libraries:** Swiper.js (carousels), Fancybox (lightbox)
- **Server:** WAMP (Apache + PHP)

## Project Structure

```
capsuleweb/
├── index.html                  # Main single-page site (~2714 lines)
├── assets/
│   ├── css/
│   │   ├── style.css           # Custom styles (~3429 lines)
│   │   ├── webflow.min.css     # Base styles
│   │   ├── swiper-bundle.min.css
│   │   └── fancybox.css
│   ├── js/
│   │   ├── script.js           # Custom scripts (~908 lines)
│   │   ├── webfont.js
│   │   ├── swiper-bundle.min.js
│   │   └── fancybox.umd.js
│   └── img/
│       ├── logo/               # Platform logos (Google Ads, Meta, etc.)
│       └── ...                 # Hero, about, service, project, team images
├── CLAUDE.md                   # Project conventions & guide
└── Capsule-Digital-Landing-Page-Content.md  # Content plan
```

## Sections

1. **Hero** — Gradient background, SVG animations, laptop illustration, CTA
2. **Social Proof Bar** — Swiper carousel of platform logos
3. **About** — Company overview, interactive cards with SVG icons
4. **Services** — 6 tabbed cards (SEO, Social Media, Paid Ads, Branding, Lead Gen, Analytics)
5. **Projects** — Horizontal scroll gallery with Fancybox lightbox
6. **Logo Marquee** — Infinite scroll partner logos
7. **Why Choose Us** — 6 comparison cards with aurora ribbon background
8. **How It Works** — 3-step timeline with orbit ring animations
9. **Testimonials** — Swiper carousel with mouse glow follower
10. **Contact** — Form with animated counters
11. **FAQ** — 7-item accordion
12. **CTA Banner** — Final call-to-action with pulse ring SVG
13. **Footer** — Newsletter, links, social icons

## Design Highlights

- Custom 3-layer cursor follower (dot, ring, glow)
- SVG stroke-draw animations on scroll
- Floating particles and aurora ribbon effects
- Counter animations with digit column transitions
- `prefers-reduced-motion` support throughout
- Responsive breakpoints: 479px, 767px, 991px, 1279px, 1439px

## Local Development

1. Place the project in your WAMP `www` directory
2. Start WAMP server
3. Visit `http://localhost/sklentr/capsuleweb/`

## Brand

- **Company:** Capsule Digital
- **Location:** Sydney, Australia
- **Services:** SEO, Social Media Marketing, Google Ads, Content Creation, Process Automation, Business Growth Consulting
