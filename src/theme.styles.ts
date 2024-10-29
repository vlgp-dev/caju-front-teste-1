const colors = {
  primary: {
    main: "#FDF8E9",
    light: "#87CEFA",
    dark: "#836700",
  },
  secondary: {
    main: "#EEEEFD",
    light: "#FFA07A",
    dark: "#4242DF",
  },
  tertiary: {
    main: "#FBEDF6",
    light: "#FFFF00",
    dark: "#901C66",
  },
  brand: {
    primary: "#64a98c",
    secondary: "#1E90FF",
    tertiary: "#2F6049",
  },
  success: {
    main: "rgb(155, 229, 155)",
    light: "#fff",
    dark: "#008000",
  },
  danger: {
    main: "rgb(255, 145, 154)",
    light: "#fff",
    dark: "#8B0000",
  },
  warning: {
    main: "#ff8858",
    light: "#fff",
    dark: "#FF8C00",
  },
  light: "#fff",
  dark: "#000",
};

const spacings = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
};

const borderWidth = {
  sm: "1px",
  md: "2px",
  lg: "4px",
};

const radii = {
  sm: "4px",
  md: "8px",
  lg: "16px",
  xl: "24px",
  "2xl": "36px",
};

const fontSize = {
  sm: "12px",
  md: "16px",
  lg: "24px",
};

const sizes = {
  ...spacings,
  "3xl": "36px",
  "4xl": "48px",
  "5xl": "56px",
  "6xl": "64px",
};

export const theme = {
  colors,
  spacings,
  borderWidth,
  radii,
  fontSize,
  sizes,
};

export type Theme = typeof theme;
