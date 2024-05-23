/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    aspectRatio,
    forms,
  ],
}
