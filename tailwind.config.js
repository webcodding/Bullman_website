/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xsm: { max: "450px" },
      sm: { min: "451px", max: "650px" },
      smd: { min: "651px", max: "767px" },
      md: { min: "768px", max: "991px" },
      xmd: { min: "992px", max: "1190px" },
      lg: { min: "1191px", max: "1300px" },
      xlg: { min: "1301px" },
      stm: { max: "767px" },
      dmd: { min: "768px", max: "1090px" },
      mtl: { min: "1090px" },
      nmd: { min: "768px", max: "1290px" },
      nsm: { max: "674px" },
      nlg: { max: "1420px" },
      nxlg: { max: "1240px" },
      mlg: { max: "1090px" },
      "2xlg": { min: "1430px" },
      dlg: { min: "1090px", max: "1429px" },
    },
    extend: {
      colors: {
        fade: "#7a7a7a",
        navyBlue: "#315593",
        darkSlate: "#404040",
      },
    },
    fontFamily: {
      mada: ["Mada"],
      roboto: ["Roboto"],
    },
  },
  plugins: [],
};
