/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(168, 85, 247, 0.35), 0 20px 45px rgba(99, 102, 241, 0.25)',
      },
    },
  },
  plugins: [],
}

