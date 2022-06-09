/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      boxShadow: {
        box: "0px 4px 16px rgba(32, 32, 32, 0.05);",
      },
    },
  },
  plugins: [],
};
