/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: "0 12px 32px -4px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
  plugins: [],
};