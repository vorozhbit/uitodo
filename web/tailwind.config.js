/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          blue: "#006eff",
          "blue-light": "#338cff",
          black: "#000000d9",
        },
      },
      fontFamily: {
        uiregular: ["UIRegular", "sans-serif"],
        uibold: ["UIBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
