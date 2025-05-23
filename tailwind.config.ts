import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
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
          50: '#f0faff',
          100: '#e0f4ff',
          200: '#b9e4ff',
          300: '#7dd0ff',
          400: '#36b6ff',
          500: '#009eff',
          600: '#007fd1',
          700: '#0061a3',
          800: '#004476',
          900: '#00294a',
        },
        dark: {
          100: '#1e1e2f',
          200: '#161625',
          300: '#0e0e19',
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.foreground"),
            a: {
              color: theme("colors.primary.DEFAULT"),
              "&:hover": {
                color: theme("colors.primary.foreground"),
              },
            },
            h1: { fontWeight: "700" },
            h2: { fontWeight: "600" },
            code: {
              backgroundColor: theme("colors.muted.DEFAULT"),
              padding: "0.25rem 0.375rem",
              borderRadius: "0.25rem",
            },
          },
        },
      }),
    },
  },
  plugins: [animate, typography],
};

export default config;

