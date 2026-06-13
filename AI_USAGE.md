# AI Usage Declaration

This repository has been designed, coded, and tested in a collaborative pair-programming session between a human developer and **Antigravity**, an AI assistant for Advanced Agentic Coding developed by the Google DeepMind team.

---

## ✦ AI Contributions

### 1. Architectural Design & Scaffolding
- Structured the workspace as a Vite-React-TypeScript single page application.
- Configured modular separations between the Vedic mathematics library (`src/engine/`) and the view presentation cards (`src/components/`).
- Designed a custom, responsive dark-cosmic styling system in Vanilla CSS using Custom Properties.
- Created dynamic base path resolution config configurations in `vite.config.ts` to allow automatic deployments on both Vercel (`/`) and GitHub Pages (`/HOROGEM/`) pipelines.

### 2. Algorithmic Implementations
- Implemented deterministic Vedic astrology calculations, Yogas, and Vimshottari dasha cycles in `astrology.ts`.
- Translated the 4-step gemstone suitability rules (Lagna Lord, Yogakaraka, functional benefic checks, and Trika house filters) into TypeScript logic in `gemstones.ts`.
- Built Chaldean-based name and date numerology solvers in `numerology.ts`.
- Programmed a custom love/marriage predictor engine in `Chatbot.tsx` evaluating relationship connections between the 5th House Lord, 7th House Lord, Rahu, Venus, and Jupiter.

### 3. Audio & Visual Syntheses
- Programmed a canvas frequency wave visualizer and browser mic capture integrations.
- Built a Web Audio API synthesizer that dynamically generates warm 136.1Hz meditative drone frequencies without external audio file dependencies.
- Rendered North Indian Kundali charts and sacred geometric Yantras using pure SVG paths and canvas line strokes.

### 4. Layout Optimization & Mobile Responsiveness
- Implemented mobile-responsive overlay drawer layouts for the birth profile manager, enabling smooth slide-in gestures and dimming screen backdrop overlays on mobile screen viewports.
- Structured a flexible double-row header on mobile (top row actions + bottom row tabs) that displays as a single row on desktop using CSS `display: contents` grid/flex overrides.
- Wrapped wide tables in responsive scroll wrappers to eliminate horizontal page breaking.
- Centered time and date pickers to ensure dropdown elements fit screen dimensions on narrow widths.
- Hooked state calculations to automatically slide sidebar panels closed upon form submission on mobile.

### 5. Settings Configuration & Security Refactoring
- Transferred local configurations from the Admin Panel to a global modal Settings popover accessible in the main header, storing credentials directly in client-side `localStorage`.
- Set up fallback support for the environment variable `VITE_GEMINI_API_KEY` for zero-setup assistant calls.

---

## ✦ Developer Oversight

All generated code was compiled, bundle-tested, and audited by the human developer. The project compiles with zero typescript compiler errors (`npx tsc --noEmit`) and bundles successfully for production deployment.
