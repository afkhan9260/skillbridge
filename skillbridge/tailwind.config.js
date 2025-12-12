// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-primary"],
  theme: {
    extend: {
      colors: {
        primary: '#5f6FFF',
      },
    },
  },
  plugins: [],
}
