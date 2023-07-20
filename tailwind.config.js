/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderColor: {
        "blue-custom": "#2D9CDB",
      },
      backgroundColor: {
        "blue-custom": "#2D9CDB",
      },
      textColor: {
        "blue-custom": "#2D9CDB",
        "black-secondary": "#383A3D",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      animation: {
        fade: "fadeOut 1500s ease-in-out",
        slideL: "slideL 500ms linear",
        slideR: "slideR 500ms linear",
        changeImage: "trans 0.8s forwards",
        disappear: "disappear 1.2s forwards",
      },

      keyframes: (theme) => ({
        fadeOut: {
          from: { opacity: 0.4 },
          to: { opacity: 1 },
        },
        slideL: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideR: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        trans: {
          "0%": {
            transform: "scale(1) rotate(5deg)",
          },
          "100%": {
            transform: "rotate(0deg) scale(1.01)",
          },
        },
        disappear: {
          "0%": {
            opacity: 1,
            marginLeft: "10%",
          },
          "25%": {
            opacity: 0.5,
          },

          "50%": {
            opacity: 0,
            marginLeft: "20%",
            zIndex: 0,
          },

          "75%": {
            opacity: 0.2,
          },
          "80%": {
            opacity: 0,
          },

          "100%": {
            opacity: 1,
            marginLeft: "10%",
            /* transform: rotate(5deg);
                z-index: 0; */
          },
        },
      }),
    },
  },
  plugins: [],
};
