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

    .react-datepicker__calendar-icon {
      right: ${theme.spacings.md};
      top: 10px;
      box-sizing: border-box;
      height: ${theme.sizes.lg};
      width: ${theme.sizes.lg};
      padding: 0;
      cursor: pointer;
    }

    .react-datepicker__view-calendar-icon input {
      padding-left: ${theme.spacings.md};
    }

    .react-datepicker-popper {
      margin-top: -${theme.spacings.lg};
    }

    .react-datepicker__day--selected {
      background-color: ${theme.colors.brand.primary};

      &:hover {
        background-color: ${theme.colors.brand.tertiary};
      }
    }
  `
);

type DatePickerStatusStyles = {
  $hasError: boolean;
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
  width: 100%;

  &:focus {
    outline: none;
  }

  & input {
    margin-bottom: 0;
  }
`;

const statusStyles = ({ $hasError, theme }: DatePickerStatusStyles) => {
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

export const DatePicker = styled.input<DatePickerStatusStyles>(
  baseStyles,
  statusStyles
);

export const ErrorMessage = styled.span<{ theme: Theme }>(
  ({ theme }) => css`
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.danger.dark};
  `
);
