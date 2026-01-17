import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        muted: "#475569",
        brand: "#ff6b4a",
        "brand-dark": "#e35330",
        "brand-soft": "#ffe3db",
        teal: "#0ea5a5",
        "teal-soft": "#dff7f3",
        sand: "#f7f4ee",
        "sand-dark": "#efe7dc"
      },
      boxShadow: {
        soft: "0 20px 40px -28px rgba(15, 23, 42, 0.35)",
        lift: "0 24px 60px -30px rgba(15, 23, 42, 0.45)"
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        "float-slow": "float-slow 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
