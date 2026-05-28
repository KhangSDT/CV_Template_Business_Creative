/**
 * Font Google Fonts
 * Hướng dẫn: src/huongdan.md
 */

export interface GoogleFontRole {
  family: string;
  weights: number[];
  italic?: boolean;
}

export interface FontTheme {
  sans: GoogleFontRole;
  display: GoogleFontRole;
  accent: GoogleFontRole;
}

export const fonts: FontTheme = {
  sans: {
    family: "Be Vietnam Pro",
    weights: [400, 500, 600, 700],
  },
  display: {
    family: "Outfit",
    weights: [500, 600, 700],
  },
  accent: {
    family: "Lora",
    weights: [400, 500],
    italic: true,
  },
};

export const presets = {
  creative: {
    sans: { family: "Plus Jakarta Sans", weights: [400, 500, 600, 700] },
    display: { family: "Outfit", weights: [500, 600, 700] },
    accent: { family: "Lora", weights: [400, 500], italic: true },
  },
  classic: {
    sans: { family: "Lato", weights: [400, 700] },
    display: { family: "Merriweather", weights: [400, 700] },
    accent: { family: "Merriweather", weights: [400], italic: true },
  },
  minimal: {
    sans: { family: "DM Sans", weights: [400, 500, 700] },
    display: { family: "DM Sans", weights: [600, 700] },
    accent: { family: "DM Sans", weights: [400], italic: true },
  },
  editorial: {
    sans: { family: "Work Sans", weights: [400, 500, 600, 700] },
    display: { family: "Cormorant Garamond", weights: [500, 600, 700] },
    accent: { family: "Cormorant Garamond", weights: [500], italic: true },
  },
  vietnamese: {
    sans: { family: "Be Vietnam Pro", weights: [400, 500, 600, 700] },
    display: { family: "Be Vietnam Pro", weights: [600, 700] },
    accent: { family: "Lora", weights: [400, 500], italic: true },
  },
} as const satisfies Record<string, FontTheme>;

function familyToParamName(family: string): string {
  return family.trim().replace(/\s+/g, "+");
}

function roleToGoogleParam(role: GoogleFontRole): string {
  const name = familyToParamName(role.family);
  const weights = [...new Set(role.weights)].sort((a, b) => a - b);

  if (role.italic) {
    const pairs = weights.flatMap((w) => [`0,${w}`, `1,${w}`]);
    return `family=${name}:ital,wght@${pairs.join(";")}`;
  }

  return `family=${name}:wght@${weights.join(";")}`;
}

export function getGoogleFontsUrl(theme: FontTheme = fonts): string {
  const params = [theme.sans, theme.display, theme.accent]
    .map(roleToGoogleParam)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

const VI_FALLBACK_SANS =
  "'Segoe UI', 'Helvetica Neue', 'Arial', 'Tahoma', system-ui, sans-serif";
const VI_FALLBACK_SERIF = "'Georgia', 'Times New Roman', 'Palatino Linotype', serif";

function cssFamily(family: string): string {
  return `'${family.replace(/'/g, "\\'")}', ${VI_FALLBACK_SANS}`;
}

function cssFamilySerif(family: string): string {
  return `'${family.replace(/'/g, "\\'")}', ${VI_FALLBACK_SERIF}`;
}

export function getFontCssBlock(theme: FontTheme = fonts): string {
  return [
    ":root {",
    `  --font-sans: ${cssFamily(theme.sans.family)};`,
    `  --font-display: ${cssFamily(theme.display.family)};`,
    `  --font-accent: ${cssFamilySerif(theme.accent.family)};`,
    "}",
    ".cv-page {",
    "  font-family: var(--font-sans);",
    "  -webkit-font-smoothing: antialiased;",
    "  -moz-osx-font-smoothing: grayscale;",
    "  text-rendering: optimizeLegibility;",
    "}",
  ].join("\n");
}
