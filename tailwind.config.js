/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: '#F9F9FB',
        alabaster: '#F4F5F6',
        slateDeep: '#1A1D20',
        slateMuted: '#5A626A',
        sapphire: {
          DEFAULT: '#1E3A5F',
          light: '#2A4E7E',
          dark: '#142843',
          subtle: '#EFF4F9',
        },
        stoneBorder: '#E5E7EB',
        warmStone: '#63594D',
        forest: {
          DEFAULT: '#1E7B54',
          hover: '#176343',
          subtle: '#ECF7F2',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px -2px rgba(26, 29, 32, 0.05), 0 1px 3px -1px rgba(26, 29, 32, 0.03)',
        'elevated': '0 12px 32px -4px rgba(30, 58, 95, 0.08), 0 4px 12px -2px rgba(26, 29, 32, 0.04)',
      }
    },
  },
  plugins: [],
}

