import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        raycast: {
          background: "#1A1A1A",
          card: "#232323",
          hover: "#2A2A2A",
          border: "#343434",
          text: "#EFEFEF",
          "text-secondary": "#999999",
          accent: "#6E56CF",
        },
      },
      fontFamily: {
        mono: ["SF Mono", "Menlo", "Monaco", "Courier", "monospace"],
      },
      keyframes: {
        "modal-open": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "modal-open": "modal-open 0.2s ease-out",
        "fade-in": "fade-in 0.15s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;