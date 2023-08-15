/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#415c58",
        secondary: "#e9f9ef",
        gray: "#303030",
      },
    },
  },
  plugins: [],
};
