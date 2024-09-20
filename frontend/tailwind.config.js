/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bowlby: ["Bowlby One", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3f6212",

          secondary: "#78716c",

          accent: "#D7DED0",

          "base-100": "#bae6fd",
        },
      },
    ],
  },
};
