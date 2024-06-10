/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { Poppins: "Poppins" },
    extend: {
      colors: {
        transparentBlack: "rgba(0,0,0,0.85)",
        sunsetOragne: "#ff4f5a",
        Tangaroa: "#1a2e35",
        Gainsboro: "#e1e1e1",
        greenTeal: "#22c55e",
        Gray: "#6b7498",
      },
    },
    screens: {
      xs: "480px",
      sm: "468px",
      md: "1060px",
    },
  },
  plugins: [],
};
