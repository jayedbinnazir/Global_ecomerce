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
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
  plugins: [
    daisyui,
    aspectRatio,
    forms,
  ],
}
