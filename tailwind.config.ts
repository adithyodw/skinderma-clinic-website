import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D7377',
          50: '#E6F5F5',
          100: '#CCEBEB',
          200: '#99D7D8',
          300: '#66C3C4',
          400: '#33AFB0',
          500: '#0D7377',
          600: '#0A5C5F',
          700: '#084547',
          800: '#052E2F',
          900: '#031718',
        },
        secondary: {
          DEFAULT: '#C75B8A',
          50: '#FAF0F5',
          100: '#F5E1EB',
          200: '#EBC3D7',
          300: '#E0A5C3',
          400: '#D67EAC',
          500: '#C75B8A',
          600: '#B3436F',
          700: '#8F3557',
          800: '#6B273F',
          900: '#471A29',
        },
        accent: {
          DEFAULT: '#C9A961',
          50: '#FAF6ED',
          100: '#F5EDDB',
          200: '#EBDBB7',
          300: '#E1C993',
          400: '#D7B76F',
          500: '#C9A961',
          600: '#B8924A',
          700: '#8F7139',
          800: '#665128',
          900: '#3D3017',
        },
        neutral: {
          bg: '#F8F9FA',
          DEFAULT: '#F8F9FA',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          800: '#2D2D2D',
          700: '#404040',
          600: '#525252',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'luxury': '0 4px 40px rgba(13, 115, 119, 0.12)',
        'luxury-lg': '0 8px 60px rgba(13, 115, 119, 0.18)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'gold': '0 4px 20px rgba(201, 169, 97, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #0D7377 0%, #085C5F 50%, #C75B8A 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A961 0%, #E8C97A 50%, #C9A961 100%)',
        'gradient-hero': 'linear-gradient(160deg, #0D7377 0%, #1a3a4a 40%, #2d1b3d 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

export default config;
