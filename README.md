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

Two forms are connected to HubSpot portal `51191454`:

| Form | GUID | Location |
|---|---|---|
| Waitlist | `81067c08-e6eb-43ce-ad3c-2f5e2fca45bd` | Hero section |
| Contact Sales | `f7684332-cc69-4d56-bd8d-12a2b730bceb` | `/contact-sales` |

Both submit via the [HubSpot Forms API v3](https://developers.hubspot.com/docs/api/marketing/forms).

## Pages & routes

| Route | Description |
|---|---|
| `/` | Main landing page |
| `/contact-sales` | Contact sales form |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |

## Deployment

The project is deployed on Vercel. Pushing to `main` triggers a new deployment automatically. A `vercel.json` / `_redirects` config is included for SPA routing support.
