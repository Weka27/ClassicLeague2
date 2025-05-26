/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        eslblack: "#0d0d0d",
        eslblue: "#1e448c",
        eslgrey: "#cfcfcf",
      },
      fontFamily: {
        sans: ["'Orbitron'", "ui-sans-serif"],
      },
    },
  },
  plugins: [],
};
