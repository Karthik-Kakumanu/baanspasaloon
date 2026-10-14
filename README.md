# BAAN — Salon · Beauty · Spa
### Immersive Cinematic 3D Luxury Web Experience

A high-fidelity, interactive luxury salon and spa web application for **BAAN Salon, Beauty & Spa**, inspired by world-class spa destinations and tailored specifically to the BAAN brand identity.

---

## 🌟 Visual Identity & Design System

The application implements a curated black-and-gold luxury palette paired with warm ivory and charcoal accents for editorial rhythm:

| Design Token | Hex Code | Visual Application |
| :--- | :--- | :--- |
| **Rich Black** | `#050505` | Primary dark backgrounds, hero bases, footer foundations |
| **Soft Black** | `#0C0B0A` | Elevated surfaces, secondary headers, floating controls |
| **Charcoal** | `#181614` | Section backgrounds, card foundations, modal containers |
| **Warm Ivory** | `#F6F0E7` | Contrast sections, brand intro, editorial story panels |
| **White** | `#FFFFFF` | Service showcase cards, crisp typography highlights |
| **Champagne Gold** | `#BFA078` | Primary luxury headings, borders, badge strokes |
| **Gold Highlight** | `#D6B45C` | Shimmer accents, active nav indicators, interactive hovers |
| **Deep Gold** | `#977344` | Subheadings, ornamental dividers, subtle metadata |

- **Official Brand Crest**: The original supplied BAAN logo (`public/images/baanb-logo.png`) is preserved intact without modifying the crest.

---

## ⚡ 3D & Interactive Architecture

1. **`Hero3DCanvas.tsx`**
   - High-performance, lightweight HTML5 Canvas rendering engine.
   - Three concentric 3D celestial orbit rings with slow angular velocity and pointer lerping.
   - 45 ambient floating champagne-gold ember particles with depth scaling and gentle cursor dispersion.
   - Automatic fallback and `prefers-reduced-motion` compliance.

2. **`TiltCard.tsx`**
   - Perspective 3D tilt component utilizing mouse tracking without external heavy 3D bundles.
   - Dynamically calculates `rotateX`, `rotateY`, and `scale3d`.
   - Real-time specular gold glare gradient sheen overlay (`radial-gradient`).
   - Smooth CSS spring physics return on pointer exit (`cubic-bezier(0.23, 1, 0.32, 1)`).

3. **`GoldButton.tsx`**
   - Luxury interactive CTA button with diagonal shimmering light beam sweep on hover.
   - Tactile active press state (`scale-[0.98]`) and directional arrow translation.
   - Supports `primary`, `outline`, and `charcoal` variants across `sm`, `md`, and `lg` scales.

4. **`GoldDivider.tsx`**
   - Symmetrical ornamental gold motif divider with central diamond and gradient rules.

---

## 🗺️ Route Architecture

### Public Customer Routes
- `/` — Homepage featuring Cinematic 3D Hero, Stats Showcase, Quick Booking Bar, Brand Story, 3D Tilt Experience Cards, Service Rail, Membership Promo, and Testimonials.
- `/about` — Editorial philosophy, photo strips with 3D tilt, Vision & Mission, and media highlights.
- `/services` (also `/service`) — Interactive category filters, 5-column responsive service cards wrapped in `TiltCard`, pricing pills, and direct booking actions.
- `/service/:slug` — Dedicated treatment ritual page with rich photography, benefit list, inclusions, and related therapies.
- `/membership` — BBH membership tier cards with 3D perspective, concierge callout, 8 privilege cards, and 3 How-It-Works steps.
- `/virtual-tour` — Branch switcher, perspective tour viewer, 3D tilt gallery grid, and full-screen lightbox modal with keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`).
- `/contact` (also `/contact-us`) — 4 branch location cards with 3D tilt, interactive contact form with local persistence, and phone concierge links.
- `/franchise` — Partnership benefits, model breakdown, and investment enquiry form.

### Demonstration Admin Routes
- `/admin/login` — Demonstration login screen (`admin@baan.demo` / `demo1234`).
- `/admin/dashboard` — Live management dashboard displaying real-time metrics, appointment requests from `localStorage`, service catalogue, membership leads, and editable business settings.

---

## 💾 Local Demonstration Data Persistence

All customer actions persist safely in the browser's `localStorage`:
- `baan_appointments` — Appointment requests submitted via Quick Booking Bar or Appointment Modal.
- `baan_contact_messages` — Inquiries submitted via Contact form.
- `baan_membership_leads` — Expressions of interest submitted via Membership Modal.
- `baan_franchise_leads` — Franchise queries submitted via Franchise form.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 22+)
- npm or pnpm

### Development
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### Production Build & Preview
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

### End-to-End Verification
```bash
# Run automated smoke test suite (validates booking, contact, admin & storage)
node scratch/verify_e2e.cjs
```
