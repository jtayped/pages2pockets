/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#020a0d",
        background: "#E1F3FC",
        primary: "#89cff0",
        secondary: "#c3e4f4",
        accent: "#2493c6",
      },
      fontFamily: {
        inter: ["Inter", "ui-sans-serif"],
        poppins: ["Poppins", "ui-sans-serif"],
      },
      spacing: {
        header: "100px",
      },
    },
  },
  plugins: [],
};
