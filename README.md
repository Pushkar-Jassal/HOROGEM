# Horogem: Gemstone Recommendation & Astrology Consultation Platform

Horogem is a premium, AI-powered astrology suite combining Vedic Cosmology, Lal Kitab rules, Numerology calculations, and Gemology with an Astrologer CRM dashboard, booking schedulers, payment matrices, and real-time audio consultation recording managers.

---

## ✦ Key Features

### 1. Horoscope & Kundali Engine
- **Ascendant & Rashi Finder**: Compute Lagna (Ascendant), Moon Sign (Rashi), and Nakshatra deterministically from birth date, time, and coordinates.
- **Divisional Charts (D1, D9, D10, Chandra)**: Full SVG-based North Indian diamond grid rendering sign indices and planetary placements (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu).
- **Yogas & Doshas**: Dynamic calculations for Budhaditya, Gajakesari, Malavya, Ruchaka, Laxmi Yogas and Manglik, Kaal Sarp, Sade Sati Doshas.
- **Vimshottari Dasha cycles**: A 100-year tree schedule detailing Mahadashas and active Antardasha transits.

### 2. Gemstone Recommendation Engine
Follows a rigorous **4-step Vedic suitability algorithm**:
1. **Identify Benefics**: Locates the Lagna Lord, Yogakaraka, and house-lords of Kendra (1, 4, 7, 10) and Trikona (5, 9) houses.
2. **Identify Weaknesses**: Highlights beneficial planets with strength less than 50% (requiring assistance).
3. **Harmful Filter**: Filters out functional malefics and planets placed in Trika houses (6, 8, 12).
4. **Rank & Prescribe**: Assigns Primary, Secondary, and Tertiary gemstones, outlining metals, fingers, wearing days, weights, and Beej Mantras.

### 3. Alternative Remedies Engine
- **Lal Kitab Solutions**: Recommends behavioral adjustments, animals feed (dogs, cows, monkeys), and donation items (wheat, mustard oil, pulses) based on placements.
- **Vedic Drone Chants**: Sounds low-pass modulated 136.1Hz (OM frequency) and 204.15Hz meditative drone frequencies directly from browser AudioContext synthesis.
- **Sacred Yantras**: Generates circular vector geometries on `<canvas>` like the Shree Yantra.
- **Rudraksha beads**: Matches Mukhi counts to weak planets with stringing instructions.

### 4. Astrologer CRM & Recorder
- **Client Catalog**: Manages profiles and consultation notes, loading active clients to the global engine instantly.
- **Calendar Scheduler**: Books meetings with category tags and session status toggles.
- **Billing Invoices**: Tracks consulting fee transactions and prints clean financial invoices.
- **Consultation Recorder**: Runs browser `MediaRecorder` audio tracks, drawing canvas wave nodes, and simulates an AI voice transcript summarizing action items.
- **AI Chatbot Assistant**: Chat interface referencing the loaded birth chart to answer customized inquiries about gemstones and dashas.

---

## ✦ Repository Structure

```
horogem/
├── src/
│   ├── components/           # UI Components
│   │   ├── AstrologerCRM.tsx # Clients database, calendar, invoice bills
│   │   ├── BirthChart.tsx    # SVG Diamond Kundali D1/D9/D10/Chandra charts
│   │   ├── Chatbot.tsx       # AI Astrology chatbot assistant
│   │   ├── ConsultationRec.tsx # Microphone canvas recorder & AI summarizer
│   │   ├── Dashboard.tsx     # KPI metrics, SVG sales graphs, Gemstone editor
│   │   ├── GemstoneDb.tsx    # Gemstone database, wearing guidelines
│   │   └── ProfileManager.tsx# Birth details inputs & city autocompletes
│   ├── engine/               # Mathematical Vedic Calculation libraries
│   │   ├── astrology.ts      # Lagna, Rashi, Yogas, Vimshottari dasha cycles
│   │   ├── gemstones.ts      # 4-step gemstone selection algorithm
│   │   ├── numerology.ts     # Psychic (Mulank) and Life Path (Bhagyank) numbers
│   │   └── remedies.ts       # Remedies and Rudraksha guidelines mapping
│   ├── index.css             # Dark cosmic glassmorphic custom variables stylesheet
│   ├── App.tsx               # State coordinator & PDF print layouts
│   └── main.tsx              # React entry mount
├── index.html                # Custom SEO meta tags and Google fonts header
├── package.json              # Scaffolding dependencies
└── tsconfig.json             # TypeScript project references
```

---

## ✦ Tech Stack

- **Core**: React 19 (TypeScript)
- **Styling**: Pure Custom Vanilla CSS (Cosmic glassmorphic design system)
- **Icons**: Lucide React
- **Audio**: Web Audio API Sound Synthesizer
- **Bundler**: Vite 5.4 (optimized for local Node environments)

---

## ✦ Quick Start

### Prerequisites
- Node.js (v20.19+ or v22.12+ recommended; fully compatible with v22.8.0)
- npm

### Installation
1. Clone the repository and navigate inside:
   ```bash
   git clone <repository-url>
   cd horogem
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build production files:
   ```bash
   npm run build
   ```
5. Preview production builds:
   ```bash
   npm run preview
   ```
