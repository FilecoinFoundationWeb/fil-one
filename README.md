# Fil One — Landing Page

Marketing landing page for [Fil One](https://filone.ai), S3-compatible object storage built on Filecoin.

## Tech stack

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**

## Project structure

```
src/
├── assets/              # Images (feature cards, logo, hero, CTA background)
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx       # Hero with walkthrough video player
│   ├── IntroSection.tsx
│   ├── FeaturesSection.tsx   # Horizontal scrolling feature carousel
│   ├── ComparisonSection.tsx # Competitor comparison table
│   ├── FaqSection.tsx
│   ├── CtaSection.tsx
│   ├── Footer.tsx
│   ├── WaitlistInput.tsx     # HubSpot waitlist form
│   └── ui/                   # shadcn/ui primitives
├── pages/
│   ├── Index.tsx
│   ├── ContactSales.tsx      # Native HubSpot-connected contact form
│   ├── PrivacyPolicy.tsx
│   ├── TermsOfUse.tsx
│   └── NotFound.tsx
└── hooks/
    └── useInView.ts          # Scroll-reveal intersection observer
```

## Getting started

```sh
# Clone the repo
git clone https://github.com/filipagr/light-mode-launchpad.git
cd light-mode-launchpad

# Install dependencies
npm install

# Start dev server
npm run dev
```

## HubSpot integration

Two forms submit to HubSpot via the [Forms API v3](https://developers.hubspot.com/docs/api/marketing/forms):

- **Waitlist** — hero section
- **Contact Sales** — `/contact-sales`

Portal ID and form GUIDs are defined directly in `src/components/WaitlistInput.tsx` and `src/pages/ContactSales.tsx`.

## Pages & routes

| Route | Description |
|---|---|
| `/` | Main landing page |
| `/contact-sales` | Contact sales form |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |

## Deployment

The project is deployed on Vercel. Pushing to `main` triggers a new deployment automatically. A `vercel.json` / `_redirects` config is included for SPA routing support.
