import type { Config } from "tailwindcss";
import { tailwindBrand, tailwindCv } from "./src/color";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { ...tailwindBrand },
        cv: { ...tailwindCv },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-accent)", "Georgia", "serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        playfair: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
