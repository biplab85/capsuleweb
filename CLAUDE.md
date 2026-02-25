# MarketingFlow - Project Guide

## Project Overview
MarketingFlow is a digital marketing agency website. The goal is to recreate and enhance the design from the Webflow reference site (https://marketingflow-nx.webflow.io/) as a custom-coded, production-ready website.

**Tagline:** "Drive More Growth With Smart Marketing"
**Purpose:** Data-driven marketing & SEO agency site

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Server:** WAMP (Apache + PHP) — served from `E:/wampserver/www/sklentr/marketingflow/`
- **Local URL:** http://localhost/sklentr/marketingflow/

## Site Structure

### Pages
- Home (single-page with sections)
- About
- Services
- Team
- Pricing
- Projects
- Testimonials
- FAQ
- Contact Us

### Home Page Sections
1. **Hero** — Bold headline, "View Services" CTA, social media icons (Facebook, Instagram, LinkedIn, YouTube)
2. **About** — "Transforming Brands with Data-Driven Marketing & SEO", bullet benefits, "View Projects" CTA
3. **Services** — 6-card grid: SEO & Content Marketing, Social Media Marketing, Paid Advertising, Branding & Design, Lead Generation, Analytics & Tracking
4. **Projects** — Carousel of 9 projects + client logos
5. **Pricing** — 3 tiers: Starter ($299/mo), Growth ($499/mo), Elite ($699/mo)
6. **Team** — 4 members with roles and social links
7. **Testimonials** — 5-star review carousel
8. **Stats** — Counters: 350+ startups, projects completed, total clients
9. **Contact** — Form: name, email, service dropdown, budget, message
10. **FAQ** — 7 expandable accordion questions
11. **Newsletter** — Email subscription
12. **Footer** — Quick links, service links, contact info, social icons

## Design System

### Typography
- **Headings:** Archivo Black, League Spartan
- **Body:** Barlow, Titillium Web
- Load from Google Fonts

### Color Palette
- Modern, professional aesthetic
- Dark backgrounds with contrasting light text for hero sections
- Clean white sections with dark text for content areas

### Layout
- Full-width sections
- Responsive design (mobile-first)
- Alternating light/dark section backgrounds
- Grid-based service cards
- Smooth scroll navigation

## Brand Details
- **Company:** MarketingFlow
- **Address:** 4517 Washington Ave. Manchester, Kentucky 39495
- **Phone:** (406) 555-0120
- **Email:** support@nexoy.com
- **Social:** Facebook, Instagram, LinkedIn, YouTube
- **Credit:** Designed by Nexoy

## Conventions
- Use semantic HTML5 elements
- BEM naming convention for CSS classes
- Mobile-first responsive approach
- Keep assets in `/assets/` (images in `/assets/img/`, CSS in `/assets/css/`, JS in `/assets/js/`)
- Optimize images for web performance
- Smooth scroll behavior for anchor links
- Use CSS custom properties (variables) for colors and fonts
