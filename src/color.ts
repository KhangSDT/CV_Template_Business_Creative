/**
 * Màu website & CV
 * Hướng dẫn: src/huongdan.md
 */

export const brand = {
  charcoal: "#120a1a",
  warm: "#1f1230",
  espresso: "#352447",
  coral: "#ff5a4f",
  terracotta: "#ff3d7a",
  gold: "#ffb020",
  cream: "#fff8f3",
  blush: "#ffe4ef",
  mist: "#f3e8ff",
  paper: "#fffcfa",
} as const;

export const cv = {
  ink: "#1a0f24",
  body: "#3d2d4a",
  muted: "#6d5c7a",
  line: "#e5d0e8",
} as const;

export const ui = {
  white: "#ffffff",
  error: "#e11d48",
  toolbarMeta: "#5c4d6b",
  toolbarDot: "#8b7a9e",
  btnGhostLabel: "#2d1f3d",
} as const;

export const rgb = {
  charcoal: "18, 10, 26",
  coral: "255, 90, 79",
  gold: "255, 176, 32",
  cream: "255, 248, 243",
  magenta: "255, 61, 122",
} as const;

export const presets = {
  creative: { ...brand },
  navy: {
    charcoal: "#0a1628",
    warm: "#132d4a",
    espresso: "#1e4976",
    coral: "#38bdf8",
    terracotta: "#0ea5e9",
    gold: "#22d3ee",
    cream: "#f0f9ff",
    blush: "#e0f2fe",
    mist: "#e2e8f0",
    paper: "#ffffff",
  },
  editorial: {
    charcoal: "#1a1030",
    warm: "#2a1a45",
    espresso: "#4c3575",
    coral: "#a855f7",
    terracotta: "#ec4899",
    gold: "#fbbf24",
    cream: "#faf5ff",
    blush: "#f3e8ff",
    mist: "#ede9fe",
    paper: "#fdfcff",
  },
} as const;

export const tailwindBrand = brand;
export const tailwindCv = cv;

export function getThemeCssBlock(): string {
  return [
    ":root {",
    `  --brand-charcoal: ${brand.charcoal};`,
    `  --brand-warm: ${brand.warm};`,
    `  --brand-espresso: ${brand.espresso};`,
    `  --brand-coral: ${brand.coral};`,
    `  --brand-terracotta: ${brand.terracotta};`,
    `  --brand-gold: ${brand.gold};`,
    `  --brand-cream: ${brand.cream};`,
    `  --brand-blush: ${brand.blush};`,
    `  --brand-mist: ${brand.mist};`,
    `  --brand-paper: ${brand.paper};`,
    `  --cv-ink: ${cv.ink};`,
    `  --cv-body: ${cv.body};`,
    `  --cv-muted: ${cv.muted};`,
    `  --cv-line: ${cv.line};`,
    `  --ui-white: ${ui.white};`,
    `  --ui-error: ${ui.error};`,
    `  --rgb-charcoal: ${rgb.charcoal};`,
    `  --rgb-coral: ${rgb.coral};`,
    `  --rgb-gold: ${rgb.gold};`,
    `  --rgb-cream: ${rgb.cream};`,
    `  --rgb-magenta: ${rgb.magenta};`,
    "}",
  ].join("\n");
}
