/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "vdrk-blue": "#07041E",
      "br-red": "#F13B51",
    },
    fontFamily: {
      header: ["Cinzel"],
    },
    screens: {
      sm: { max: "640px" },
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
    },
  },
  plugins: [],
};
