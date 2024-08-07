/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      translate: {
        '-1/2': '-50%',
      }
    },
  },
  plugins: [],
}
