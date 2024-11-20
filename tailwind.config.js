/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          light: '#9F67FF',
          lighter: '#C4A7FF',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
