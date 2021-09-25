import { Theme } from "theme-ui";

export const theme: Theme = {
  breakpoints: ["375px", "768px", "1366px", "1440px", "1920px"],
  fonts: {
    body: "Sniglet, cursive",
    heading: "Sniglet, cursive",
    monospace: "Sniglet, cursive",
  },
  colors: {
    background: "#FFF",
    primary: "#f29c1f",
    secondary: "#ffc107",
    primary_hover: "#59a4e9",
    green: "#4de600",
    green_light: "#90EE90",
    silver: "#C6C6C6",
    white: "#FFF",
    black: "#000",
    red: "red",
  },
  sizes: {
    // container: 768,
  },
  images: {
    avatar: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      border: "2px solid #f29c1f",
    },
  },
  styles: {
    root: {
      // uses the theme values provided
      fontFamily: "body",
    },
  },
  forms: {
    checkbox: {
      cursor: "pointer",
      outline: "none",
    },
    textarea: {
      outline: "none",
      border: "1px solid",
      borderColor: "primary",
    },
    input: {
      outline: "none",
      border: "1px solid",
      borderColor: "primary",
    },
    radio: {
      cursor: "pointer",
    },
  },
};

export default theme;
