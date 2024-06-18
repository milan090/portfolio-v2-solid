import defaultTheme from "tailwindcss/defaultTheme"


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ["Helvetica Neue", ...defaultTheme.fontFamily.sans],
        modernist: ["Sk Modernist", ...defaultTheme.fontFamily.sans],
      }
    }
  },
  plugins: []
};
