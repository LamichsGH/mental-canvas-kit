import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Inter', 'SF Pro Text', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.875rem',    /* 14px */
        'sm': '1rem',        /* 16px */
        'base': '1.125rem',  /* 18px */
        'lg': '1.375rem',    /* 22px */
        'xl': '1.75rem',     /* 28px */
        '2xl': '2.25rem',    /* 36px */
        '3xl': '3rem',       /* 48px */
        '4xl': '4rem',       /* 64px */
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hover: "hsl(var(--secondary-hover))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        'text-subtle': "hsl(var(--text-subtle))",
        
        ingredient: {
          bg: "hsl(var(--ingredient-bg))",
          card: "hsl(var(--ingredient-card))",
          'icon-bg': "hsl(var(--ingredient-icon-bg))",
          icon: "hsl(var(--ingredient-icon))",
        },
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',      /* 12px buttons/inputs */
        'DEFAULT': 'var(--radius-sm)',
        'lg': 'var(--radius-lg)',      /* 20px cards/images */
        'xl': '1.5rem',                /* 24px */
        '2xl': '2rem',                 /* 32px */
      },
      spacing: {
        'section': '3.5rem',           /* 56px vertical section spacing */
        'section-sm': '2rem',          /* 32px on mobile */
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
