const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#99FFE0",
          100: "#69FFD2",
          200: "#39FFC4",
          dark: "#09FFB5",
          400: "#00D897",
          500: "#00A876",
          600: "#007854",
          light: "#006043",
          800: "#004832",
          900: "#001811",
        },
        secondary: {
          50: "#99EBFF",
          100: "#69E1FF",
          dark: "#39D7FF",
          300: "#09CEFF",
          400: "#00ADD8",
          500: "#0086A8",
          light: "#006078",
          700: "#004D60",
          800: "#003A48",
          900: "#002630",
        },
        compleprimary: {
          dark: "#FF99B8",
          100: "#FF6996",
          200: "#FF3974",
          300: "#FF0953",
          400: "#D80041",
          light: "#C0003A",
          600: "#A80032",
          700: "#780024",
          800: "#60001D",
          900: "#480016",
        },
        complesecond: {
          dark: "#FFAD99",
          100: "#FF8769",
          200: "#FF6139",
          300: "#FF3A09",
          400: "#D82B00",
          light: "#C02600",
          600: "#A82200",
          700: "#781800",
          800: "#601300",
          900: "#480E00",
        },
        ebony: "#222428",
        whiteSmoke: "#F5F5F5",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
