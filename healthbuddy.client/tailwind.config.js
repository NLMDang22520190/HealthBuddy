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
        mint_cream: "#F5FFFA",
        seashell: "#FFF5EE",
        floral_white: "#FFFAF0",
        snow: "#FFFAFA",
        ghost_white: "#F8F8FF",
        jet: "#2A2A2A",
        raisin_black: "#242124",
        oxford_blue: "#212437",
        card_dark: "#1F2937",
        gunmetal: "#1D1F21",
        bg_dark: "#0A0A0A",
        bg_light: "#FAFAFA",
        bg_content_dark: "#181818",
        bg_divide_dark: "#383939",
        bg_divide_light: "#D9D9D9",
        bg_card_flowbite_dark: "#1F2937",
      },
      height: {
        "90%": "90%",
        "full-navbar": "calc(100vh - 100px)",
        "full-navbar-default": "calc(100vh - 200px)",
        sidebar: "calc(100vh - 70px)",
      },
      width: {
        "full-sidebar": "calc(100vw - 65px)",
      },
      screens: {
        "sm-md": "700px", // Giữa sm và md
        "md-lg": "900px", // Giữa md và lg
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        fadeIn: "fadeIn 0.6s ease-out",
        slideUp: "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require("tailwind-hamburgers"),
    function ({ addUtilities }) {
      addUtilities({
        ".line-clamp-1": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "1",
        },
        ".line-clamp-2": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
        },
        ".line-clamp-3": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "3",
        },
      });
    },
  ],
};
