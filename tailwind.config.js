/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grimoire': {
          'dark': '#1a1a2e',
          'page': '#f5f1e8',
          'gold': '#d4af37',
          'ink': '#2c1810',
        }
      },
      fontFamily: {
        'handwriting': ['"Dancing Script"', 'cursive'],
        'serif': ['"Crimson Text"', 'serif'],
        'title': ['"MedievalSharp"', 'cursive']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'page-turn': 'page-turn 1.5s ease-in-out',
        'book-open': 'book-open 2s ease-in-out'
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'sparkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        },
        'page-turn': {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-90deg)' },
          '100%': { transform: 'rotateY(-180deg)' }
        },
        'book-open': {
          '0%': { transform: 'rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}