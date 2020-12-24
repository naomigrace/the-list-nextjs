const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans:
          '-apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      colors: {
        transparent: "transparent",
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        red: colors.rose,
        yellow: colors.amber,
        green: colors.emerald,
        blue: colors.blue,
        purple: colors.indigo,
        pink: colors.pink,
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
