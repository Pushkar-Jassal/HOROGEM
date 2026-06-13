# HOROGEM: Developer Project Notes

This document contains key engineering choices, system architecture notes, configuration layouts, and updates completed during the development of **HOROGEM** (Vedic Astrology CRM & Gemstone Recommendation Platform).

---

## ✦ System Architecture

The application is structured as a client-side Single Page Application (SPA) built with **Vite**, **React 19**, and **TypeScript**. 

### 1. Calculation Engine (`src/engine/`)
Contains pure, deterministic mathematical and rule-based functions representing classical Vedic astrology:
- [astrology.ts](file:///c:/Users/pushk/OneDrive/Desktop/horogem/src/engine/astrology.ts): Computes planet degrees, sign placements, ascendant (Lagna), moon sign (Rashi), Nakshatras, Classical Yogas (e.g., Budhaditya, Gajakesari), Doshas (Manglik, Sade Sati), and generates 100-year Vimshottari Mahadasha/Antardasha timelines.
- [gemstones.ts](file:///c:/Users/pushk/OneDrive/Desktop/horogem/src/engine/gemstones.ts): Implements the **4-step suitability algorithm** to identify Life (Lagnesh), Lucky (Bhagyesh), and Work (Karmesh) stones, and filter out functional malefics or planets placed in Trika houses (6, 8, 12).
- [remedies.ts](file:///c:/Users/pushk/OneDrive/Desktop/horogem/src/engine/remedies.ts): Maps planetary placements to Lal Kitab remedies, donation programs, Rudraksha guidelines, and color therapies.
- [numerology.ts](file:///c:/Users/pushk/OneDrive/Desktop/horogem/src/engine/numerology.ts): Solves psychic numbers (Mulank) and life path numbers (Bhagyank).

### 2. UI Components (`src/components/`)
- [BirthChart.tsx](file:///c:/Users/pushk/OneDrive/Desktop/horogem/src/components/BirthChart.tsx): Renders North Indian Kundali grids (D1, D9, D10, Chandra) using SVG. Text elements are placed using responsive Cartesian coordinates.
- [Chatbot.tsx](file:///c:/Users/pushk/OneDrive/Desktop/horogem/src/components/Chatbot.tsx): Provides an interactive chat interface. Supports fallback keyword matching or live queries using Gemini client-side calls.
- [AstrologerCRM.tsx](file:///c:/Users/pushk/OneDrive/Desktop/horogem/src/components/AstrologerCRM.tsx): Includes billing ledger, printable invoice models, calendar booking schedulers, and client records.
- [ConsultationRec.tsx](file:///c:/Users/pushk/OneDrive/Desktop/horogem/src/components/ConsultationRec.tsx): Captures audio using browser microphone API, renders real-time frequency waveforms on `<canvas>`, and simulates AI-driven session summaries.

---

## ✦ Key Engineering Decisions & Updates

### 1. API Configuration & Key Storage
- **Removed Admin Panel**: The admin panel was removed to simplify navigation and secure configuration access.
- **Global Settings Modal**: The Gemini API key setup is relocated to a global settings popup modal in the header, saved directly in `localStorage` under the key `horogem_gemini_api_key`.
- **Zero-Setup Compatibility**: If no local key is entered, the chatbot falls back to reading the environment variable `VITE_GEMINI_API_KEY` (configured at build-time) or falls back to an offline rule-based Vedic parser.

### 2. Vercel & GitHub Pages Dynamic Paths
To support simultaneous deployments on both Vercel (root `/` path serving) and GitHub Pages (subfolder `/HOROGEM/` path serving) without manual configuration modifications:
- [vite.config.ts](file:///c:/Users/pushk/OneDrive/Desktop/horogem/vite.config.ts) resolves base path dynamically:
  ```ts
  base: process.env.GITHUB_ACTIONS ? '/HOROGEM/' : '/'
  ```

### 3. Love & Marriage Predictive Logic
- An offline love and arrange marriage calculator is integrated directly into the local rule parser in `Chatbot.tsx`. 
- Evaluates planet associations between the **5th House Lord** (romance, courtship), **7th House Lord** (partnership, marriage), Rahu (unconventional/love connections), and Venus/Jupiter (romance and wisdom significators) to predict relationship paths.

### 4. Full Mobile Responsiveness (Pure CSS & React State Hooks)
- **Overlay Drawer Layout**: On mobile screens (width <= `768px`), the `360px` sidebar drawer behaves as a fixed overlay drawer rather than squeezing layout viewports. It dims the main interface with a backdrop and collapses automatically when the backdrop is clicked.
- **Auto-Close calculated profiles**: When details are submitted on a phone, the drawer automatically slides shut to show chart SVG graphics instantly.
- **Preserved Form States**: The form sidebar contents remain mounted in React (visibility controlled via CSS rules) to prevent resetting user fields during drawer transitions.
- **Split Two-Row Mobile Header**: Resolves cramped layout headers on small screens by splitting actions (top row) and horizontal-scroll tab selectors (bottom row). Uses modern CSS `display: contents` to keep desktop row alignment seamless.
- **Horizontal scroll tables**: Wrapped data tables (ledger, matchmaking) in overflow scroll wrappers (`.table-container`) to avoid squishing detailed columns.
- **Centered inputs dropdowns**: Horizontally centers date and clock pickers to avoid screen margin overflows on narrow widths.

---

## ✦ Local Setup & Production Compilation
- **Type checking check**: `npx tsc --noEmit`
- **Build compiler execution**: `npm run build`
- **Preview static outputs**: `npm run preview`
