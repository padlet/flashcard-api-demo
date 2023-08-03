/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-border": "rgba(255, 255, 255, 0.2)",
        "app-blue": {
          100: "#4E6FE3",
          60: "rgba(78, 111, 227, 0.6)",
          20: "rgba(78, 111, 227, 0.2)",
        },
        "app-bg": "rgba(243,244,245,0.7)",
        purple: {
          primary: "#5D35D0",
          secondary: "rgba(93, 53, 208, 0.20)",
        },
        "blue-text": {
          100: "#2352F8",
        },
        "dark-text": {
          100: "#111111",
          200: "rgba(0,0,0,0.54)",
        },
        black: {
          100: "#111111",
          20: "rgba(0,0,0,0.2)",
          40: "rgba(0,0,0,0.4)",
        },
        white: {
          20: "rgba(255, 255, 255, 0.2)",
          40: "rgba(255, 255, 255, 0.4)",
          50: "rgba(255, 255, 255, 0.5)",
          100: "#FFFFFF",
          default: "#FFFFFF",
        },
        "light-text": {
          100: "#FFFFFF",
        },
        "progress-bar": {
          background: "#F5F8FD",
        },
      },
      boxShadow: {
        card: "0px 8px 16px 0px rgba(0, 0, 0, 0.16), 0px 8px 16px 0px rgba(78, 111, 227, 0.20)",
        button:
          "0px 8px 12px -16px rgba(0, 0, 0, 0.12), 0px 8px 12px 0px rgba(255, 255, 255, 0.08) inset, 16px 24px 64px -24px rgba(255, 255, 255, 0.08) inset",
        "button-hover":
          "0px 8px 12px -16px rgba(0, 0, 0, 0.18), 0px 8px 12px 0px rgba(255, 255, 255, 0.16) inset, 16px 24px 64px -24px rgba(255, 255, 255, 0.16) inset",
        "input-focus": "0px 0px 0px 6px rgba(134, 168, 255, 0.32)",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover"],
    },
  },
  plugins: [],
};
