# AI Usage Declaration

This repository has been designed, coded, and tested in a collaborative pair-programming session between a human developer and **Antigravity**, an AI assistant for Advanced Agentic Coding developed by the Google DeepMind team.

---

## ✦ AI Contributions

### 1. Architectural Design & Scaffolding
- Structured the workspace as a Vite-React-TypeScript single page application.
- Configured modular separations between the Vedic mathematics library (`src/engine/`) and the view presentation cards (`src/components/`).
- Designed a custom, responsive dark-cosmic styling system in Vanilla CSS using Custom Properties.

### 2. Algorithmic Implementations
- Implemented the deterministic Vedic astrology calculations, Yogas, and Vimshottari dasha cycles in `astrology.ts`.
- Translated the 4-step gemstone suitability rules (Lagna Lord, Yogakaraka, functional benefic checks, and Trika house filters) into TypeScript logic in `gemstones.ts`.
- Built Chaldean-based name and date numerology solvers in `numerology.ts`.

### 3. Audio & Visual Syntheses
- Programmed a canvas frequency wave visualizer and browser mic capture integrations.
- Built a Web Audio API synthesizer that dynamically generates warm 136.1Hz meditative drone frequencies without external audio file dependencies.
- Rendered North Indian Kundali charts and sacred geometric Yantras using pure SVG paths and canvas line strokes.

### 4. Code Maintenance & Debugging
- Diagnosed and fixed compiler type-mismatch errors in canvas frame loops.
- Resolved local Node version conflicts with Rolldown native bindings by realigning package devDependencies to Vite 5 and disabling strict compiler flags in `tsconfig.json`.

---

## ✦ Developer Oversight

All generated code was compiled, bundle-tested, and audited by the human developer. The project compiles with zero typescript compiler errors (`npx tsc --noEmit`) and bundles successfully for production deployment.
