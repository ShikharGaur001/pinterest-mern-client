/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'pinterest' : '#e60023'
      },
      boxShadow: {
        'even': '0 0 30px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        "scroll-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "scroll-up": "scroll-up 10s infinite linear",
        "scroll-down": "scroll-down 10s infinite linear",
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
