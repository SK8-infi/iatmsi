# Conference Template Website — Project Standards & Architecture

> **Purpose**: This document defines the architecture, conventions, and data standards for the
> conference template website. Every AI agent and future tooling (including the planned Tauri
> no-code editor) MUST follow these rules. The overarching goal is to make this codebase
> **100% data-driven** so that non-technical users can change ANY visible content **and**
> **page structure** by editing data files alone — never touching JSX, components, or styles.

---

## 1. Vision & North Star

This is a **reusable conference website template**. A Tauri-based no-code desktop application
will eventually allow professors and organizers to:

1. Clone/fork this repository via GitHub.
2. **Edit all visible content** through a visual WYSIWYG interface.
3. **Add, remove, and reorder pages** from a page palette.
4. **Rearrange, add, and remove sections** within any page via drag & drop.
5. **Edit the navigation bar** — add/remove links, create/modify dropdown menus.
6. See changes reflected in a live preview rendered from the actual React code.
7. Commit and push changes back to GitHub — deploying the updated site.

The Tauri editor operates on **two layers** of the `src/data/` directory:

| Layer | What it controls | Files |
|-------|-----------------|-------|
| **Content** | Text, images, links, dates, people, fees | `conferenceData.js`, `committeeData.js`, `tracksData.js`, etc. |
| **Structure** | Which pages exist, what sections each page contains, section order, navigation tree | `pageRegistry.js`, `navigationData.js` |

> [!CAUTION]
> **ZERO hardcoded content in components or pages.** Every user-visible string, URL, image
> path, list, date, and structured block MUST be sourced from a file in `src/data/`.
> Components are pure renderers — they receive data via imports or props and display it.
> They never define what the content *is*, only how it *looks*.

> [!CAUTION]
> **ZERO hardcoded page composition.** Which sections appear on a page and in what order
> is defined in `src/data/pageRegistry.js`. Page components do NOT manually import and
> arrange section components — they read their composition from the registry and render
> sections dynamically. This enables the Tauri editor to restructure pages by editing data.

---

## 2. Technology Stack

| Layer           | Technology                         | Version  |
|-----------------|------------------------------------|----------|
| Framework       | React                              | 19.x     |
| Bundler         | Vite                               | 7.x      |
| Styling         | Tailwind CSS                       | 4.x      |
| Routing         | React Router DOM                   | 7.x      |
| Deployment      | Vercel (SPA catch-all rewrite)     | —        |
| Package Manager | npm                                | —        |

### Tailwind v4 Rules

- **DO NOT** create a `tailwind.config.js` file. Tailwind v4 uses the CSS-first `@theme`
  directive inside `src/index.css`.
- All custom color tokens, font families, and shadows are defined in the `@theme` block.
- If a new token is needed, add it to the `@theme` block — never use raw hex values in JSX.

---

## 3. Project Structure

```
├── index.html                  # HTML shell — SEO meta tags sourced from siteConfig
├── public/
│   ├── favicon.svg
│   └── images/                 # Local image assets (prefer over external URLs)
├── src/
│   ├── main.jsx                # React entry point — mounts <App />
│   ├── App.jsx                 # Dynamic router — reads pageRegistry to generate <Route> entries
│   ├── index.css               # Tailwind v4 import, @theme tokens, base styles
│   ├── App.css                 # App-specific utility classes and animations
│   │
│   ├── constants/
│   │   └── routes.js           # ROUTES object (auto-derived from pageRegistry)
│   │
│   ├── data/                   # ★ SINGLE SOURCE OF TRUTH FOR ALL CONTENT + STRUCTURE ★
│   │   ├── siteConfig.js       # Global site configuration (SEO, branding, external links)
│   │   ├── pageRegistry.js     # ★ PAGE STRUCTURE — defines all pages & their sections ★
│   │   ├── navigationData.js   # ★ NAV STRUCTURE — full navigation tree (items + dropdowns) ★
│   │   ├── conferenceData.js   # Conference info, dates, intro, objectives, scope, institute
│   │   ├── committeeData.js    # All committee member arrays + contact person
│   │   ├── tracksData.js       # Conference tracks/topics
│   │   ├── registrationData.js # Fee structure + registration notes + process steps
│   │   ├── latestUpdates.js    # Ticker/marquee updates
│   │   ├── heroData.js         # Hero section carousel images + CTA config
│   │   ├── submissionData.js   # Paper submission guidelines, deadlines, templates, policies
│   │   ├── travelData.js       # Visa info, venue directions, local transport, attractions
│   │   ├── reviewerData.js     # Call for reviewers content
│   │   └── sponsorsData.js     # Sponsors and partners (future)
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable atomic UI primitives (Button, Card, etc.)
│   │   ├── layout/             # App shell (Layout, Navbar, Footer, ScrollToTop)
│   │   ├── sections/           # ★ ALL page sections live here (each is a standalone block) ★
│   │   │   ├── HeroSection.jsx
│   │   │   ├── IntroSection.jsx
│   │   │   ├── AboutInstitute.jsx
│   │   │   ├── ConferenceScope.jsx
│   │   │   ├── Objectives.jsx
│   │   │   ├── FocusAreas.jsx
│   │   │   ├── TracksGrid.jsx
│   │   │   ├── ImportantDatesTimeline.jsx
│   │   │   ├── RegistrationFeeTable.jsx
│   │   │   ├── CommitteeGrid.jsx
│   │   │   ├── ContactInfo.jsx
│   │   │   ├── SubmissionGuidelines.jsx
│   │   │   ├── TravelVisa.jsx
│   │   │   ├── VenueDirections.jsx
│   │   │   ├── ExploreCity.jsx
│   │   │   ├── CallForReviewers.jsx
│   │   │   └── ...              # New sections are added here
│   │   ├── committee/          # Committee display sub-components (MemberCard, etc.)
│   │   ├── registration/       # Registration sub-components
│   │   ├── tracks/             # Track card sub-components
│   │   └── dates/              # Timeline sub-components
│   │
│   ├── pages/
│   │   └── DynamicPage.jsx     # ★ SINGLE page component — renders sections from registry ★
│   │
│   └── utils/
│       ├── cn.js               # clsx + tailwind-merge utility
│       └── sectionResolver.js  # Maps section IDs to React components
```

---

## 4. Data Layer — The Content Contract

### 4.1 Principles

1. **One data file per content domain.** Do not mix committee data with conference info.
2. **Named exports only.** Every data file uses named exports — never default exports.
   This lets the Tauri editor enumerate available data blocks.
3. **Flat, serializable structures.** Data files export plain JS objects, arrays, and strings.
   No functions, no React elements, no imports from other modules.
4. **Consistent field naming.** Use camelCase for field names. Use the canonical field names
   defined in the schemas below. Do not invent new names for the same concept.
5. **No sentinels.** Don't use magic strings like `"coming_soon"` or `"TBD"` to encode state.
   Use explicit boolean/null fields instead (e.g., `isAvailable: false`, `url: null`).
6. **Every data file starts with a header comment.** Format: `// <Domain> data — <ConferenceShortTitle>`
7. **Images:** Prefer storing images in `public/images/` with relative paths (`/images/hero/1.jpg`).
   External URLs (Google Drive, LinkedIn) are fragile and break when permissions change.

### 4.2 Data File Schemas

Each schema below defines the **exact shape** of every data file. When creating a new
conference from this template, populate these files with the new conference's data.

---

#### `siteConfig.js` — Global Site Configuration

```js
// Site configuration — <ConferenceShortTitle>

export const siteConfig = {
  // SEO & HTML <head>
  seo: {
    title: 'string',             // HTML <title>, e.g. "IATMSI-2027 | Full Title"
    description: 'string',       // <meta name="description">
    keywords: 'string',          // <meta name="keywords">
    author: 'string',            // <meta name="author">
    favicon: 'string',           // Path to favicon, e.g. "/favicon.svg"
  },

  // Branding
  branding: {
    conferenceLogo: 'string',    // URL/path to conference logo image
    instituteLogo: 'string',     // URL/path to institute/organizer logo
    instituteName: 'string',     // Full institute name for top bar
    instituteUrl: 'string',      // Link for institute logo/name
  },

  // External service links
  externalLinks: {
    submissionPortal: {
      name: 'string',           // e.g. "Microsoft CMT"
      url: 'string',            // Full URL to submission portal
    },
    reviewerForm: {
      name: 'string',           // e.g. "Google Forms"
      url: 'string',            // Full URL to reviewer application form
    },
    paperTemplate: {
      name: 'string',           // e.g. "IEEE Manuscript Template"
      url: 'string',            // URL to download template
    },
    pdfExpress: {
      name: 'string',           // e.g. "IEEE PDF eXpress"
      url: 'string',            // URL to PDF validation tool
    },
  },

  // Footer acknowledgments (e.g., CMT disclaimer)
  acknowledgments: ['string'],
};
```

---

#### `pageRegistry.js` — Page Structure and Composition

```js
// Page Registry — <ConferenceShortTitle>

// List of all sections available to be rendered on pages
export const sectionManifest = [
  { id: 'hero', component: 'HeroSection', requiresData: ['heroData'] },
  { id: 'intro', component: 'IntroSection', requiresData: ['conferenceData'] },
  { id: 'aboutInstitute', component: 'AboutInstitute', requiresData: ['conferenceData'] },
  // ... all other available sections
];

// Definition of each page and the sections it contains (in order)
export const pageRegistry = [
  {
    id: 'home',
    title: 'Home',
    path: '/', // The route path
    sections: [
      { sectionId: 'hero', props: { isHomePage: true } },
      { sectionId: 'intro', props: {} },
      { sectionId: 'aboutInstitute', props: {} },
    ]
  },
  // ... other pages
];
```

---

#### `conferenceData.js` — Conference Information

```js
// Conference data — <ConferenceShortTitle>

export const conferenceInfo = {
  shortTitle: 'string',         // e.g. "IATMSI-2027"
  fullTitle: 'string',          // Full conference name
  edition: 'string|null',       // e.g. "1st", "2nd" (optional)
  mode: 'string',               // "Hybrid" | "In-Person" | "Virtual"
  dates: 'string',              // Human-readable date range
  organizedBy: 'string',        // Organizing body name
  venue: {
    name: 'string',             // Full venue/institute name
    shortName: 'string',        // Abbreviated name
    address: 'string',          // Full postal address
    city: 'string',             // City name (for travel/explore page title)
    mapEmbedUrl: 'string',      // Google Maps embed URL
  },
};

export const introContent = {
  mainIntro: 'string',          // Background/rationale paragraph
  aboutConference: 'string',    // Conference description paragraph
};

export const conferenceObjectives = ['string'];  // Array of objective strings

export const conferenceScope = 'string';          // Scope paragraph

export const aboutInstitute = {
  institute: 'string',          // About the host institute
  department: 'string',         // About the organizing department/center
};

export const importantDates = [
  {
    activity: 'string',         // What the date is for
    date: 'string',             // Human-readable date
    oldDate: 'string|null',     // Previous date if extended (shown as strikethrough)
    isDeadline: 'boolean',      // true = deadline, false = notification/event
    url: 'string|null',         // Link for action (null = no link available yet)
    isAvailable: 'boolean',     // true = link is live, false = coming soon
  },
];
```

---

#### `committeeData.js` — Committee Members

```js
// Committee data — <ConferenceShortTitle>

// Each committee group is a named export array of member objects.
// The export name determines the group title in the UI.
// Common groups: honoraryGeneralChairs, generalChairs, conferenceChairs,
//   conferenceCoChairs, organizingChairs, technicalProgramCommittee,
//   advisoryCommittee, publicityChairs, financeChairs, webChairs

export const <groupName> = [
  {
    name: 'string',             // Full name with title (e.g. "Prof. John Doe")
    designation: 'string|null', // e.g. "SMIEEE", "FIEEE" (post-nominal letters)
    affiliation: 'string',      // Institution/organization
    email: 'string|null',       // Contact email (null if not public)
    profileUrl: 'string|null',  // Link to profile page
    image: 'string|null',       // URL/path to photo (null = show initials)
  },
];

export const contactPerson = {
  name: 'string',
  designation: 'string',
  email: 'string',
  phones: ['string'],           // Array of phone numbers
};
```

---

#### `tracksData.js` — Conference Tracks

```js
// Tracks data — <ConferenceShortTitle>

export const tracks = [
  {
    id: 'string',               // Unique identifier, e.g. "track1"
    number: 'number',           // Display order number
    title: 'string',            // Track title
    description: ['string'],    // Array of topic/subtopic strings
    icon: 'string',             // SVG path `d` attribute for the track icon
  },
];
```

---

#### `registrationData.js` — Registration Info

```js
// Registration data — <ConferenceShortTitle>

export const feeStructure = [
  {
    category: 'string',         // e.g. "Student (UG/PG/PhD)"
    earlyBirdIndian: 'string',  // e.g. "₹ 5,000"
    earlyBirdForeign: 'string', // e.g. "$100"
    regularIndian: 'string',
    regularForeign: 'string',
  },
];

export const registrationNotes = ['string'];  // Footnotes below fee table

export const registrationProcess = [
  {
    step: 'number',             // Step number (1-based)
    title: 'string',            // Step title
    description: 'string',      // Step description
  },
];
```

---

#### `heroData.js` — Hero Section Configuration

```js
// Hero data — <ConferenceShortTitle>

export const heroCarousel = [
  {
    id: 'string',               // Unique identifier
    url: 'string',              // Image URL/path
    alt: 'string',              // Alt text for accessibility
  },
];

export const heroCta = {
  primary: {
    label: 'string',            // e.g. "Register Now"
    route: 'string',            // Internal route path from ROUTES
  },
  secondary: {
    label: 'string',            // e.g. "Call for Papers"
    route: 'string',
  },
};

export const heroTagline = 'string';  // Mobile tagline text
```

---

#### `navigationData.js` — Navigation Configuration

```js
// Navigation data — <ConferenceShortTitle>

// The full hierarchical navigation tree
export const navigationTree = [
  {
    id: 'home',
    label: 'Home',
    type: 'link', // 'link' or 'dropdown'
    path: '/',    // Route path
  },
  {
    id: 'about',
    label: 'About',
    type: 'link',
    path: '/about',
  },
  {
    id: 'call-for-papers',
    label: 'Call for Papers',
    type: 'dropdown',
    items: [
      { id: 'tracks', label: 'Tracks', path: '/call-for-papers/tracks' },
      { id: 'dates', label: 'Important Dates', path: '/important-dates' },
      { id: 'submission', label: 'Paper Submission', path: '/call-for-papers/paper-submission' },
    ],
  },
  // ...
];
```

---

#### `submissionData.js` — Paper Submission Content

```js
// Submission data — <ConferenceShortTitle>

export const submissionGuidelines = ['string'];  // Array of guideline bullet points

export const submissionPortalInfo = {
  description: 'string',        // Paragraph about the portal
  // URL comes from siteConfig.externalLinks.submissionPortal
};

export const templateInfo = {
  description: 'string',        // Paragraph about paper format
  // URL comes from siteConfig.externalLinks.paperTemplate
};

export const cameraReadyChecklist = ['string'];   // Checklist items

export const pdfExpressInfo = {
  description: 'string',
  // URL comes from siteConfig.externalLinks.pdfExpress
};

export const reviewProcess = {
  description: 'string',        // Review process explanation paragraph
  policies: ['string'],         // Array of policy statements
};
```

---

#### `travelData.js` — Travel, Visa, Venue, Attractions

```js
// Travel data — <ConferenceShortTitle>

export const visaInfo = {
  intro: 'string',                  // Intro paragraph
  types: [
    {
      name: 'string',               // e.g. "e-Conference Visa"
      description: 'string',
      eligibility: 'string|null',
    },
  ],
  requiredDocuments: ['string'],     // List of required documents
  invitationLetterInfo: 'string',    // How to request invitation letter
  applicationSteps: ['string'],     // Step-by-step guide
  processingTime: 'string',         // e.g. "3-4 weeks"
  warningNote: 'string|null',       // Important warning text
};

export const venueInfo = {
  description: 'string',            // About the venue paragraph
  directionsFromAirport: {
    name: 'string',                  // Airport name
    distance: 'string',             // e.g. "12 km"
    time: 'string',                  // e.g. "30 minutes"
    steps: ['string'],              // Direction steps
  },
  directionsFromRailway: {
    name: 'string',
    distance: 'string',
    time: 'string',
    steps: ['string'],
  },
  fromMajorCities: [
    {
      city: 'string',
      distance: 'string',
      time: 'string',
    },
  ],
  localTransportTips: ['string'],
};

export const attractions = [
  {
    id: 'string',
    name: 'string',
    tagline: 'string',
    description: 'string',
    highlight: 'string',
    image: 'string',                 // URL/path to image
  },
];
```

---

#### `reviewerData.js` — Call for Reviewers

```js
// Reviewer data — <ConferenceShortTitle>

export const reviewerInfo = {
  intro: 'string',                  // Intro paragraph
  whoCanApply: ['string'],          // Eligibility criteria
  benefits: ['string'],            // Benefits of being a reviewer
  // Application form URL comes from siteConfig.externalLinks.reviewerForm
};
```

---

#### `latestUpdates.js` — Marquee/Ticker Updates

```js
// Latest updates — <ConferenceShortTitle>

export const latestUpdates = [
  {
    text: 'string',             // Update text
    important: 'boolean',       // true = show "NEW" badge
    link: 'string|null',        // URL (null = no link)
  },
];
```

---

## 5. Component Architecture

### 5.1 Component Hierarchy

```
App.jsx
└── Layout.jsx
    ├── Navbar                  ← reads from navigationData.js, siteConfig.js
    ├── <Outlet>                ← renders current page
    │   ├── HomePage
    │   │   ├── HeroSection     ← reads from heroData.js, conferenceData.js
    │   │   ├── IntroSection    ← reads from conferenceData.js
    │   │   └── AboutInstitute  ← reads from conferenceData.js
    │   ├── AboutPage           ← reads from conferenceData.js
    │   ├── TracksPage          ← reads from tracksData.js
    │   ├── PaperSubmissionPage ← reads from submissionData.js, siteConfig.js
    │   ├── ImportantDatesPage  ← reads from conferenceData.js
    │   ├── CallForReviewersPage ← reads from reviewerData.js, siteConfig.js
    │   ├── RegistrationPage   ← reads from registrationData.js
    │   ├── TravelVisaPage     ← reads from travelData.js
    │   ├── VenueDirectionsPage ← reads from travelData.js, conferenceData.js
    │   ├── ExploreGwaliorPage ← reads from travelData.js, conferenceData.js
    │   ├── CommitteePage      ← reads from committeeData.js
    │   └── ContactPage        ← reads from conferenceData.js, committeeData.js
    └── Footer                  ← reads from conferenceData.js, committeeData.js, siteConfig.js
```

### 5.2 Rules for Components

1. **Pages are thin composition layers.** A page file should import data, import section
   components, and compose them with props. A page should not contain inline content strings
   or complex rendering logic.

2. **Section components are pure renderers.** They receive data via props or import from
   `src/data/`. They define *layout and styling* — never *content*.

3. **UI primitives are content-agnostic.** Components in `src/components/ui/` (Button, Card,
   SectionContainer, etc.) must never import from `src/data/`. They receive everything via props.

4. **One canonical component per concept.** Do NOT create duplicate implementations. For
   example, there must be ONE `MemberCard` component used by both `CommitteePage` and
   `CommitteeGrid` — not two separate implementations.

5. **All imports from data files use named imports.**
   ```js
   // ✅ Correct
   import { conferenceInfo, importantDates } from '../data/conferenceData';
   
   // ❌ Wrong — default imports
   import conferenceData from '../data/conferenceData';
   ```

6. **Use ROUTES constant for ALL internal links.**
   ```js
   // ✅ Correct
   import { ROUTES } from '../constants/routes';
   <Link to={ROUTES.IMPORTANT_DATES}>Dates</Link>
   
   // ❌ Wrong — hardcoded path
   <Link to="/dates">Dates</Link>
   ```

### 5.3 Component File Conventions

- **One component per file.** Exception: tightly coupled sub-components that are only used
  within the parent file (e.g., a `FocusCard` used only inside `AboutPage`) may live in the
  same file, but should be defined ABOVE the main exported component.

- **Component files use PascalCase:** `HeroSection.jsx`, `MemberCard.jsx`

- **Data files use camelCase:** `conferenceData.js`, `tracksData.js`

- **Export convention:**
  - Components: `export default function ComponentName()`
  - Data files: `export const dataName = ...`

---

## 6. Styling Standards

### 6.1 Theme Tokens (defined in `src/index.css` `@theme` block)

| Token                    | Purpose                              |
|--------------------------|--------------------------------------|
| `--color-primary-50..950`| Conference brand color palette       |
| `--color-slate-800..950` | Footer and dark surface colors       |
| `--color-neutral-50..900`| Neutral grays for text and borders   |
| `--font-sans`            | Primary font stack                   |
| `--shadow-card`          | Default card shadow                  |
| `--shadow-card-hover`    | Hover-state card shadow              |
| `--shadow-lg`            | Elevated element shadow              |

### 6.2 Rules

1. **Never use raw hex/rgb values in JSX.** Use Tailwind utility classes that reference
   theme tokens: `bg-primary-900`, `text-neutral-600`, etc.
   ```jsx
   // ✅ Correct
   <div className="bg-primary-900 text-white">
   
   // ❌ Wrong
   <div style={{ backgroundColor: '#002855' }}>
   ```

2. **Exception:** Inline styles are acceptable ONLY for dynamic values computed at runtime
   (e.g., `transform: scale(${factor})`).

3. **Use `cn()` utility for conditional classes.** Import from `src/utils/cn.js`.

4. **All animations must be defined in CSS** (in `index.css` or `App.css` `@layer utilities`),
   never as inline keyframe styles.

5. **Responsive design:** Use Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
   Mobile-first approach — default styles are mobile, add breakpoints for larger screens.

---

## 7. Routing Standards

### 7.1 Route Definition

All routes are defined in `src/constants/routes.js` as the `ROUTES` object.

**Rules:**
- Every page MUST have a corresponding entry in `ROUTES`.
- Route paths use kebab-case: `/call-for-papers/tracks`, NOT `/callForPapers/tracks`.
- Nested routes use path segments: `/travel/visa`, `/travel/venue`, `/travel/explore-<city>`.
- When adding a new page, add the route to `ROUTES` FIRST, then create the page component,
  then add the `<Route>` entry in `App.jsx`.

### 7.2 Navigation

Navigation structure is defined in `src/data/navigationData.js`, NOT hardcoded in the
Navbar component. The Navbar reads from this data file and renders accordingly.

This allows the Tauri editor to modify the navigation structure by editing the data file.

---

## 8. Image Standards

### 8.1 Storage

- **Local images** go in `public/images/` organized by section:
  ```
  public/images/
  ├── hero/          # Hero carousel images
  ├── committee/     # Committee member photos
  ├── venue/         # Venue and location photos
  ├── attractions/   # Explore/tourism photos
  ├── logos/         # Conference and institute logos
  └── sponsors/      # Sponsor logos
  ```

- **Reference images by absolute path from public root:** `/images/hero/campus-1.jpg`

### 8.2 Rules

1. **Prefer local images over external URLs.** External URLs (Google Drive, LinkedIn CDN)
   are fragile — they break when permissions change or CDN URLs expire.

2. **Every image must have meaningful alt text** defined in the data file, not in the component.

3. **Hero images are defined in `heroData.js`**, not hardcoded in `HeroSection.jsx`.

4. **Committee member images are defined in `committeeData.js`** in the `image` field.
   Components must handle `null` images gracefully by showing initials or a placeholder.

---

## 9. No-Code Editor Compatibility Contract

These rules exist specifically to enable the future Tauri no-code editor:

### 9.1 Data File Format

- Data files MUST be parseable as static JavaScript modules. The Tauri editor will use a
  JS/TS parser (e.g., SWC or tree-sitter) to read and write these files.
- Data files must NOT import from other files. They must be self-contained.
- Data files must NOT use computed values, template literals with variables, or function calls.
  Only static literals (strings, numbers, booleans, arrays, objects, null).

```js
// ✅ Correct — static, parseable
export const conferenceInfo = {
  shortTitle: 'IATMSI-2027',
  dates: 'May 20-22, 2027',
};

// ❌ Wrong — computed value, not statically parseable
const YEAR = 2026;
export const conferenceInfo = {
  shortTitle: `ICGST-${YEAR}`,
  dates: getDateRange(YEAR),
};
```

### 9.2 Component ↔ Data Mapping

Every component that displays user-editable content must:

1. Import data from a specific `src/data/*.js` file (never inline content).
2. The mapping between data fields and rendered UI must be direct and traceable.
3. Data field names should be self-descriptive so the editor can auto-generate form labels.

### 9.3 Editable Content Boundaries

The Tauri editor will manage these content domains:

| Domain               | Data File            | What's Editable                           |
|----------------------|----------------------|-------------------------------------------|
| Site identity        | `siteConfig.js`      | SEO, logos, external links                |
| Conference info      | `conferenceData.js`  | Title, dates, venue, intro, objectives    |
| Committee            | `committeeData.js`   | All members, photos, roles, contact       |
| Tracks               | `tracksData.js`      | Track titles, topics, icons               |
| Registration         | `registrationData.js`| Fee table, notes, process steps           |
| Paper submission     | `submissionData.js`  | Guidelines, deadlines, templates          |
| Travel & venue       | `travelData.js`      | Visa, directions, attractions             |
| Call for reviewers   | `reviewerData.js`    | Eligibility, benefits                     |
| Latest updates       | `latestUpdates.js`   | Ticker items                              |
| Hero section         | `heroData.js`        | Carousel images, CTA buttons              |
| Navigation           | `navigationData.js`  | Nav items, dropdown structure             |
| Important dates      | `conferenceData.js`  | Dates array with activities and deadlines |

### 9.4 Schema Metadata Comments

Each data file SHOULD include a header comment block that describes its schema in a
machine-parseable format. This allows the Tauri editor to auto-generate editing forms.

```js
/**
 * @schema conferenceInfo
 * @field shortTitle {string} Short conference acronym (e.g. "IATMSI-2027")
 * @field fullTitle {string} Full conference name
 * @field mode {enum: "Hybrid"|"In-Person"|"Virtual"} Conference delivery mode
 * @field dates {string} Human-readable date range
 */
export const conferenceInfo = { ... };
```

---

## 10. Git & Deployment

### 10.1 Commit Conventions

When the Tauri editor auto-generates commits:
- Content changes: `content(<domain>): <description>` — e.g., `content(committee): update organizing chairs`
- Structure changes: `structure(<area>): <description>` — e.g., `structure(nav): add keynote speakers page`

When developers commit:
- Feature: `feat(<scope>): <description>`
- Fix: `fix(<scope>): <description>`
- Refactor: `refactor(<scope>): <description>`
- Style: `style(<scope>): <description>`

### 10.2 Deployment

- The site deploys on Vercel with SPA rewrite (`vercel.json`).
- `npm run build` produces a `dist/` folder.
- Any push to the main branch triggers auto-deployment.

---

## 11. Known Issues & Migration Checklist

The following issues exist in the CURRENT codebase and MUST be fixed when adapting for
a new conference:

> [!WARNING]
> ### Content Hardcoding Violations
> These pages/components contain hardcoded content that MUST be extracted to data files:
>
> 1. **`PaperSubmissionPage.jsx`** — ALL content is hardcoded. Extract to `submissionData.js`.
> 2. **`TravelVisaPage.jsx`** — ALL visa info is hardcoded. Extract to `travelData.js`.
> 3. **`VenueDirectionsPage.jsx`** — ALL directions hardcoded. Extract to `travelData.js`.
> 4. **`ExploreGwaliorPage.jsx`** — Attractions array hardcoded in page file. Extract to `travelData.js`.
> 5. **`CallForReviewersPage.jsx`** — ALL content hardcoded. Extract to `reviewerData.js`.
> 6. **`HeroSection.jsx`** — Carousel images array hardcoded. Extract to `heroData.js`.
> 7. **`IntroSection.jsx`** — Conference info card (dates, venue, mode) duplicated as hardcoded strings instead of using `conferenceInfo`.
> 8. **`Navbar.jsx`** — Dropdown menu items hardcoded in JSX. Extract to `navigationData.js`.
> 9. **`Footer.jsx`** — Quick links hardcoded with wrong route paths (e.g., `/dates` instead of `/important-dates`).
> 10. **`TracksPage.jsx`** — CTA deadline text hardcoded ("June 30, 2026") while data says July 31.
> 11. **`AboutPage.jsx`** — Focus areas hardcoded as inline objects.
> 12. **`RegistrationFeeTable.jsx`** — Registration process steps hardcoded.
> 13. **`index.html`** — SEO meta tags and CMT footer hardcoded.

> [!WARNING]
> ### Missing Files & Bugs
>
> 1. **`journalsData.js`** — Referenced by `JournalList.jsx` but does not exist. Either create the data file or remove the component import.
> 2. **`src/utils/cn.js`** — The `cn()` utility (clsx + tailwind-merge) is referenced in project conventions but does not exist. Must be created.
> 3. **Duplicate `MemberCard`** — Two separate implementations exist in `CommitteeGrid.jsx` and `CommitteePage.jsx`. Consolidate into a single reusable component.
> 4. **`ScaleWrapper.jsx`** — Imported in `Layout.jsx` but not rendered. Clean up or remove.

---

## 12. Creating a New Conference from This Template

To adapt this template for a new conference:

1. **Fork/clone** the repository.
2. **Update ALL data files** in `src/data/` with the new conference's information.
3. **Replace images** in `public/images/` with new conference assets.
4. **Update `index.html`** — title, meta tags (or better, make this data-driven via `siteConfig.js`).
5. **Update `package.json`** — `name` field.
6. **Update theme colors** in `src/index.css` `@theme` block if the new conference has
   different branding.
7. **Run `npm run dev`** to verify everything renders correctly.
8. **Run `npm run build`** to validate production build.
9. **Deploy** to Vercel, Netlify, or any static hosting.

No component files should need modification for a simple conference change — if they do,
it means the data abstraction is incomplete and should be fixed.

---

## 13. Future: Tauri No-Code Editor Architecture (Reference)

This section documents the planned Tauri editor architecture for future development:

```
┌─────────────────────────────────────────┐
│            Tauri Desktop App            │
│                                         │
│  ┌─────────────┐    ┌───────────────┐  │
│  │  Visual      │    │  Live Preview │  │
│  │  Editor      │◄──►│  (WebView)    │  │
│  │  (Forms +    │    │  Runs actual  │  │
│  │   WYSIWYG)   │    │  Vite dev     │  │
│  │              │    │  server       │  │
│  └──────┬───────┘    └───────────────┘  │
│         │                               │
│  ┌──────▼───────────────────────────┐   │
│  │  Data File Manager (Rust)        │   │
│  │  - Reads/writes src/data/*.js    │   │
│  │  - Parses JS AST (tree-sitter)   │   │
│  │  - Validates against schemas     │   │
│  │  - Triggers Vite HMR on save     │   │
│  └──────┬───────────────────────────┘   │
│         │                               │
│  ┌──────▼───────────────────────────┐   │
│  │  Git Manager (Rust)              │   │
│  │  - Clone/pull/push via libgit2   │   │
│  │  - Auto-commit on save           │   │
│  │  - Branch management             │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

The key insight: **the Tauri editor never touches component files.** It reads data schemas
to generate editing forms, writes changes to data files, and lets Vite HMR update the
preview in real-time. This is why the 100% data-driven architecture is non-negotiable.
