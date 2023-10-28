/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand_green: "#3C703F",
        brand_brown: "#634B2E",
        brand_orange: "#DF4E21",
        brand_yellow: "#CE9929",
        brand_maroon: "#3C1120",
      },
    },
  },
  plugins: [],
};
