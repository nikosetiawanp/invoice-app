const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
    },
    extend: {
      colors: {
        black: "#000000",
        red: "#FC484F",
        purple: "#825BFF",
        green: "#00E8A1",
        orange: "#FC9100",
        "red-hover": "#FC6268",
        "purple-hover": "#9777FF",
        "dark-blue": "#141626",
        "cool-grey": "#1F213C",
        "cool-grey-hover": "#25273C",
        "light-grey": "#868CB7",
      },
    },
  },
  plugins: [],
};
