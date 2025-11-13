/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        youtube: '#FF0000',
        facebook: '#1877F2',
        twitter: '#1DA1F2',
        pinterest: '#E60023',
        instagram: '#E4405F',
        linkedin: '#0A66C2',
        tiktok: '#000000',
      },
    },
  },
  plugins: [],
}
