/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Si tienes una carpeta src, descomenta la línea de abajo:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        homelab: {
          magenta: '#D12E7B', // Color de tu logo
          dark: '#333333',    // Gris de tu logo
          light: '#F9F9F9',
        },
      },
    },
  },
  plugins: [],
};