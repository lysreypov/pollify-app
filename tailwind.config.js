/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderColor: {
        "blue-custom": "#2d9cdb",
      },
      backgroundColor: {
        "blue-custom": "#2d9cdb",
      },
      textColor: {
        "blue-custom": "#2d9cdb",
        "black-secondary": "#383A3D",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
