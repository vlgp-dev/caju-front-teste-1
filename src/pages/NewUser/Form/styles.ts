import styled, { css } from "styled-components";

import { type Theme } from "~/theme.styles";

export const Form = styled.form<{ theme: Theme }>(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.lg};
  `
);
