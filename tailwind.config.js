/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004563",
        // primary: "#488B89",
        textColor: "#DD623A",
        secondary: "#edf4f4",
        border: "#a18500", // Your primary color hex code
        inputDark: "#191b1c", // Your primary color hex code
      },
      fontFamily: {
        noto: "Noto",
      },
      fontSize: {
        "clamp-xs": ["clamp(10px, 2vw, 16px)", "1.5rem"],
        "clamp-sm": ["clamp(14px, 2.5vw, 18px)", "1.75rem"],
        "clamp-md": ["clamp(14px, 3vw, 20px)", "1.75rem"],
        "clamp-xl": ["clamp(14px, 4vw, 16px)", "2rem"],
        "clamp-2xl": ["clamp(14px, 5.5vw, 32px)", "2.75rem"],
        // Add more custom font size variations here
      },
    },
    screens: {
      xm: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  darkMode: "class",
  plugins: [],
};
