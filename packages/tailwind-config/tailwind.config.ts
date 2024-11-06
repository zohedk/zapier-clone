import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.tsx",
  ],

  theme: {
    extend: {
      screens: {
        mobile: "500px",
        tab: "1000px",
        pc: "1400px",
      },
    },
  },
  plugins: [],
};
export default config;
