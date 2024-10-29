import styled, { css } from "styled-components";

import { type Theme } from "~/theme.styles";

import { type ButtonProps } from "./";

type StyledButtonProps = {
  theme: Theme;
  $size: ButtonProps["size"];
  $radius: ButtonProps["radius"];
  $appearance: ButtonProps["appearance"];
};

const sizeMap = (theme: Theme) => ({
  sm: {
    padding: `${theme.spacings.md} ${theme.spacings.lg}`,
    fontSize: `${theme.fontSize.sm}`,
  },
  lg: {
    padding: `${theme.spacings.lg} ${theme.spacings["2xl"]}`,
    fontSize: `${theme.fontSize.md}`,
  },
});

const radiusMap = (theme: Theme) => ({
  sm: {
    borderRadius: `${theme.radii.sm}`,
  },
  lg: {
    borderRadius: `${theme.radii["2xl"]}`,
  },
});

const appearanceMap = (theme: Theme) => ({
  success: {
    color: theme.colors.dark,
    bg: theme.colors.success.main,
    hoverBg: theme.colors.success.dark,
    hoverColor: theme.colors.success.light,
  },
  danger: {
    color: theme.colors.dark,
    bg: theme.colors.danger.main,
    hoverBg: theme.colors.danger.dark,
    hoverColor: theme.colors.danger.light,
  },
  warning: {
    color: theme.colors.dark,
    bg: theme.colors.warning.main,
    hoverBg: theme.colors.warning.dark,
    hoverColor: theme.colors.warning.light,
  },
  default: {
    color: theme.colors.dark,
    bg: theme.colors.brand.primary,
    hoverBg: theme.colors.brand.tertiary,
    hoverColor: theme.colors.light,
  },
});

export const Button = styled.button<StyledButtonProps>(
  ({ theme, $size = "lg", $radius = "sm", $appearance = "default" }) => {
    const sizeStyles = sizeMap(theme)[$size];
    const appearanceStyles = appearanceMap(theme)[$appearance];
    const radiusStyles = radiusMap(theme)[$radius];

    return css`
      outline: none;
      display: flex;
      align-items: center;
      border: none;
      border-radius: ${radiusStyles.borderRadius};
      background-color: ${appearanceStyles.bg};
      color: ${appearanceStyles.color};
      cursor: pointer;
      font-weight: 600;
      padding: ${sizeStyles.padding};
      font-size: ${sizeStyles.fontSize};
      transition: 0.3s ease;

      &:hover {
        background: ${appearanceStyles.hoverBg};
        color: ${appearanceStyles.hoverColor};
      }

      &:active {
        transition: 0.1s ease;
        transform: scale(1.025);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `;
  }
);
