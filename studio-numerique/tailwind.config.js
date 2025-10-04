/** @tailwind.config.js - Configuration Tailwind CSS pour Studio Numérique 2025 **/


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./lib/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Theme SVA Officiel
        sva: {
          primary: '#081C6F', // Bleu SVA
          secondary: '#2F959B', // Vert SVA
          accent: '#FF6F00', // Jaune SVA
          dark: '#0A0E1B',
          light: '#F5F7FA'
        },
        border: "hsl(220 13% 91%)",
        input: "hsl(220 13% 91%)",
        ring: "hsl(222.2 84.% 4.9%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        primary: {
          DEFAULT: "hsl(222.2 47% 11%)",
          foreground: "hsl(210 0% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(210 40% 98%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(210 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(210 40% 98%)",
          foreground: "hsl(215.4 5.5% 45.1%)",
        },
        accent: {
          DEFAULT: "hsl(210 40% 98%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Poppins', 'sans-serif']
      },
      animation: {
        // Animations XR et interactions
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'spin-slow': 'spin 3s30ms linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'hologram': 'hologram 10s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #8899C7, 0 0 10px #8899C7, 0 0 20px #8899C7' },
          '50%': { boxShadow: '0 0 20px#FF6F00, 0 0 40px #FF6F00, 0 0 60px #FF6F00' },
        },
        hologram: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '400% 0%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'hologram': 'linear-gradient(45deg, #0081A5 0%, #FF6F00 25%, #0081A5 50%, #FF6F00 75%, #0081A5 100%)',
      },
      backgroundSize: {
        ['400%']: '400%'
      },
    },
  },
  plugins: [require(\"tailwindcss-animate\")],
}