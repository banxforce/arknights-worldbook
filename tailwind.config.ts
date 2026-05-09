import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          ink: "#050607",
          panel: "#101214",
          panel2: "#171a1d",
          line: "#2d3135",
          muted: "#9a9a94",
          paper: "#e8e2d3",
          cyan: "#47d6c8",
          amber: "#f0b429",
          rust: "#c75237"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: ["JetBrains Mono", "Cascadia Code", "Consolas", "monospace"]
      },
      boxShadow: {
        terminal: "0 24px 80px rgba(0, 0, 0, 0.45)"
      }
    }
  },
  plugins: []
} satisfies Config;
