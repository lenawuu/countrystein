/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ultraprint: ["Ultraprint", "sans-serif"],
        bowlby: ["bowlby", "sans-serif"],
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

          accent: "#facc15",

          "base-100": "#bae6fd",
        },
      },
    ],
  },
};
