/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: { 950: '#09080a', 900: '#100d12', 800: '#19141c', 700: '#241c28' },
        rose: { 300: '#ffb3d1', 400: '#ff7fb5', 500: '#ff4d97', 600: '#e0287a', 700: '#b5195e' },
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-16px) rotate(6deg)' } },
        twinkle: { '0%,100%': { opacity: 0.25, transform: 'scale(0.8)' }, '50%': { opacity: 1, transform: 'scale(1.15)' } },
        shimmer: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: 0.6 }, '100%': { transform: 'scale(1.8)', opacity: 0 } },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        marquee: 'marquee 40s linear infinite',
        pulseRing: 'pulseRing 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
