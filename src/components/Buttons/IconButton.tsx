import styled, { css } from "styled-components";

import { type Theme } from "~/theme.styles";

export const _IconButtonStyled = styled.button<{ theme: Theme }>(
  ({ theme }) => css`
    cursor: pointer;
    border: ${theme.borderWidth.md} solid #64a98c;
    width: fit-content;
    padding: ${theme.spacings.sm};
    border-radius: ${theme.radii.xl};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    svg {
      color: #64a98c;
    }
  `
);

type IconButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = (props: IconButtonProps) => {
  return <_IconButtonStyled {...props}>{props.children}</_IconButtonStyled>;
};
