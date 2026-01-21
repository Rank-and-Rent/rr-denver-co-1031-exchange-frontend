import type { Config } from "tailwindcss";
import tokens from "./styles/tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: tokens.paper,
        ink: tokens.ink,
        heading: tokens.heading,
        primary: tokens.primaryBg,
        primaryfg: tokens.primaryFg,
        secondary: tokens.secondaryBg,
        secondaryfg: tokens.secondaryFg,
        outline: tokens.outline,
        panel: tokens.panel,
        "warm-brown": "#785530",
        "dark-brown": "#4A3520",
        cream: "#F5F0E8",
        "warm-gray": "#A89A8C",
        "light-cream": "#FAF8F5",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(0, 0, 0, 0.45)",
        luxury: "0 4px 30px rgba(120, 85, 48, 0.12)",
        "luxury-lg": "0 10px 60px rgba(120, 85, 48, 0.15)",
      },
      letterSpacing: {
        luxury: "0.15em",
        "luxury-wide": "0.25em",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;