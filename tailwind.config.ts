import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B80000"
      },
      fontFamily: {
        sans: ["Roboto Condensed", "sans-serif"]
      }
    },
  },
  plugins: [],
}
export default config

