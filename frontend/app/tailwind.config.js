export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#c9953b',
        'gold-600': '#b3812f',
        bg: '#0f0f10',
        'bg-soft': '#121212',
        text: '#f7f7f5',
        'text-dim': '#cfcfcb',
        muted: '#8b8b86',
        surface: '#1c1c1c',
        border: '#2a2a2a',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
