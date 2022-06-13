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

    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",

      gray: {
        100: "#fcfcfc",
        200: "#f3f3f3",
        600: "#878787",
        900: "#202020",
      },

      red: {
        500: "#ba1200",
      },

      green: {
        500: "#68b43e",
        600: "#5a9c36",
      },
    },
  },
  plugins: [],
};
