import styled, { css } from "styled-components";

import { type Theme } from "~/theme.styles";

export const Wrapper = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    & > label {
      font-size: ${theme.fontSize.sm};
      margin-bottom: ${theme.spacings.sm};
      font-weight: 600;
    }
  `
);

type InputStatusStyles = {
  $hasError?: boolean;
  theme: Theme;
};

const baseStyles = () => css`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: box-shadow 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;

  &:focus {
    outline: none;
  }

  & input {
    margin-bottom: 0;
  }
`;

const statusStyles = ({ $hasError, theme }: InputStatusStyles) => {
  if (!$hasError)
    return css`
      margin-bottom: 14px;

      &:focus {
        border: 1px solid #007c89;
        box-shadow: inset 0 0 0 1px #007c89;
      }
    `;

  return css`
    margin-bottom: 2px;

    &:focus {
      border-color: ${theme.colors.danger.dark};
      box-shadow: inset 0 0 0 1px ${theme.colors.danger.dark};
    }
  `;
};

export const Input = styled.input<InputStatusStyles>(baseStyles, statusStyles);

export const ErrorMessage = styled.span<{ theme: Theme }>(
  ({ theme }) => css`
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.danger.dark};
  `
);
