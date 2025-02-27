import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "intro-bg": "url(/intro-bg.png)",
      },
      colors: {
        brightOrange: "#FF9800",
        beige: "#F5F5DC",
        fieryRed: "#F44336",
        darkGray: "#333333",
        darkPurple: "#27203F",
        slateGray: "#607D8B",
        softGray: "#CFD8DC",
      },
    },
  },
  plugins: [],
} satisfies Config;
