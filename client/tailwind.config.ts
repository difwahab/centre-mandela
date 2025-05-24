import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        brand: {
          50: "#f0faff",
          100: "#e0f4ff",
          200: "#b9e4ff",
          300: "#7dd0ff",
          400: "#36b6ff",
          500: "#009eff",
          600: "#007fd1",
          700: "#0061a3",
          800: "#004476",
          900: "#00294a",
        },

        dark: {
          100: "#1e1e2f",
          200: "#161625",
          300: "#0e0e19",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
      },
    },
  },
  plugins: [
    animate,
    typography,
    plugin(({ addBase, theme }) => {
      addBase({
        "h1": {
          fontWeight: "700",
          fontSize: theme("fontSize.4xl"),
          marginBottom: "0.75em",
          color: theme("colors.foreground"),
        },
        "h2": {
          fontWeight: "600",
          fontSize: theme("fontSize.3xl"),
          marginBottom: "0.5em",
          color: theme("colors.foreground"),
        },
        "h3": {
          fontWeight: "600",
          fontSize: theme("fontSize.2xl"),
          marginBottom: "0.5em",
          color: theme("colors.foreground"),
        },
        "p": {
          marginBottom: "1em",
          lineHeight: "1.75",
          color: theme("colors.foreground"),
        },
        "a": {
          color: theme("colors.primary.DEFAULT"),
          textDecoration: "underline",
          fontWeight: "500",
        },
        "a:hover": {
          color: theme("colors.primary.foreground"),
        },
        "code": {
          backgroundColor: theme("colors.muted.DEFAULT"),
          color: theme("colors.foreground"),
          padding: "0.25rem 0.375rem",
          borderRadius: "0.25rem",
          fontSize: "0.875em",
        },
        "blockquote": {
          fontStyle: "italic",
          borderLeft: `4px solid ${theme("colors.muted.DEFAULT")}`,
          paddingLeft: "1em",
          color: theme("colors.muted.foreground"),
        },
        "ul": {
          listStyleType: "disc",
          paddingLeft: "1.5em",
        },
        "ol": {
          listStyleType: "decimal",
          paddingLeft: "1.5em",
        },
      });
    }),
  ],
};

export default config;
