module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "book-background": "url('/public/book-background.jpg')",
      },
      colors: {
        lightGrey: "rgba(0, 0, 0, 0.87)",
        softGrey: "rgba(0, 0, 0, 0.04)",
        selectedGrey: "rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
