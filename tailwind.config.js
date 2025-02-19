/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        spinOnce: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinOnce: "spinOnce 0.5s linear",
      },
      fontFamily: {
        casino: ["Casino", "sans-serif"],
      },
    },
  },
  plugins: [],
};
