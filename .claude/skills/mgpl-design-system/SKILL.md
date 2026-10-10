---
name: mgpl-design-system
description: MGPL Diagnostics (Maa Gayatri Path Lab) website design system — brand, Lotus Drop logo, Saffron & Neel palette, Outfit/Geist type, Phosphor icons, "Living Lab" station layout, copy and content rules. Use for ANY visual, layout, copy, icon, color, font or component change on this site, including new sections. Load before editing components/, app/globals.css or lib/config/.
---

# MGPL Design System

The site is **"The Living Lab"**: a calm, sunlit sandstone lab. A fixed 3D lab scene is the main visual, and the camera travels from station to station as you scroll. Each page section is one station: its content sits on one side and its lab object on the other. Persuade mode: a family member decides to book a test.

Brief priority: the user's direct instructions → this skill → general design skills (impeccable, taste, ui-ux-pro-max, apple-design, emil-design-eng). **Never** use the `frontend-design` skill (banned by the user).

## Brand assets

| Asset | File | Use |
|---|---|---|
| Full logo (light) | `public/logo.svg` (920×388) | Light surfaces |
| Full logo (navy) | `public/logo-dark.svg` | Footer and other navy surfaces |
| Compact lockup | `public/logo-compact.svg` (904×372) | Navbar (no tagline) |
| Favicon / app icons | `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` | Next file conventions |
| Sources | `logos/export/*` | PNG sizes 16–2048 |

- **Do** use the drawn dark variant on navy. **Don't** use CSS `invert`/`brightness` filters on the logo. **Why:** filters flatten the lotus into one colour (this bug shipped once).
- The wordmark is outlined paths (Gelasio Bold + Outfit SemiBold, both OFL), so it renders the same everywhere. Don't swap it for live text.

## Colour: "Saffron & Neel"

Tokens live in `app/globals.css` `:root` and map to Tailwind via `@theme inline` (`bg-saffron`, `text-navy`, …).

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--saffron` | #C2410C | CTAs, accent words | white text 5.2:1 |
| `--saffron-light` (`saffron-deep`) | #A3360A | CTA **hover** (darker, not lighter) | keeps white legible |
| `--amber` (marigold) | #E9A23B | accents on navy, stars, glows | never body text on cream |
| `--navy` (Neel ink) | #14264A | headings, nav, footer | 13.9:1 on cream |
| `--forest` (tulsi) | #1E7A4F | verified / normal / ready states only | 4.9:1 |
| `--cream` | #FAF6EF | page background (body) | |
| `--muted` | #675F54 | secondary text | 5.8:1 |

- **Do** use tokens/Tailwind theme classes. **Don't** hard-code hex in components unless it's a one-off tint with no token (e.g. `#5FD39B` verified-green on navy). **Why:** one palette change should re-skin the site.
- On navy: accent = `text-amber`, secondary = `text-white/60–75`. Never saffron text on navy (2.2:1).
- Old palette (#E65100 / #0D2B5E / #FF8F00) is retired: white text on #E65100 failed WCAG AA.

## Typography

- Display: **Outfit** (`font-display`, tracking −0.02em). Body: **Geist**. Data: **Geist Mono**. All via `next/font/google` in `app/layout.tsx`.
- Emphasis = the same family at `font-light` in saffron (e.g. "Compassionate Care."). **Don't** mix in a serif word or use italics (Outfit has none).
- Mono **only** for data: prices, report values, IDs, phone numbers. **Why:** mono as a "technical costume" is an AI tell.
- Hero h1 stays at 2 lines on desktop (`sm:whitespace-nowrap` on line one), ≤ `xl:text-[4rem]`. Section h2: `text-4xl sm:text-5xl lg:text-[3.5rem]`, `text-balance`.
- Body measure 44–52ch (`max-w-[52ch]`).

## Icons

- **Only** `components/ui/Icon.tsx` → Phosphor (`@phosphor-icons/react/dist/ssr`, `*Icon` exports), default `weight="light"`.
- Config JSON stores icon *names* (legacy Lucide names like `TestTube2`, `HeartPulse`). Add new names to the `REGISTRY` map, not to the JSON consumer.
- **Don't** import Lucide, emoji, or unicode glyphs as icons. **Don't** use non-suffixed Phosphor exports (`TestTube`): they're deprecated.

## Layout: stations

- Every page section has `data-station` and appears in the same order as `STATIONS` in `components/three/engine.ts`.
- Use `.station-grid` with a content column `data-side="left" | "right" | "right-narrow"` (cols 1–7 or 6–12). The 3D object takes the other side.
- Object side in `STATIONS[i].side` must be the **opposite** of the content side.
- Section rhythm: `.section-pad` (4.5rem / 6rem lg). **Don't** stack extra top/bottom margins. **Why:** doubled padding created the "huge gaps" the user saw.
- Hero is `min-h-[100dvh]` and must fit the viewport at 1440×900 including the readout rail.

## Surfaces (craft floor)

- Card radius 16px (`rounded-2xl`). Pills only for small controls/buttons.
- One elevation per surface: **either** a soft offset shadow **or** a hairline border. No ring + shadow, no nested cards, no double-bezel shells.
- Lists and ledgers (services index, doctors, features) use hairline `border-navy/10` dividers, not card grids.
- Glass (`.glass`) only on floating chrome: navbar, dialog. The navbar also has a cream scroll-edge fade behind it.
- **Banned:** eyebrow/kicker labels above headings, section numbers (except real sequences like "Step 01"), gradient text, grain/noise overlays, grid-line backgrounds, ornamental bento, colored side borders > 1px (except the single quote rule in WhyChoose), initials-avatars or fake photos.

## Copy and content

- Content lives in `lib/config/*.json`, typed in `lib/types.ts` (`satisfies`). Change copy there, not in JSX, except section-local microcopy.
- Testimonials are **sample** content until verified Google reviews arrive. Keep the "Sample reviews shown" note. No avatars.
- No em dashes in new UI copy. Buttons name the action ("Get my report", "Book a Test"). Errors name the problem and the fix.
- Don't invent claims, accreditations, prices or numbers. Everything comes from config.

## Accessibility (non-negotiable)

- Contrast ≥ 4.5:1 for body, ≥ 3:1 for large text. Visible `:focus-visible` ring (saffron, set globally).
- Icon-only buttons need `aria-label`. Decorative icons are `aria-hidden` (Icon does this by default).
- Honour `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast` (all wired in `globals.css`).
- Forms: visible labels, hint and error linked via `aria-describedby`, `aria-invalid`.
