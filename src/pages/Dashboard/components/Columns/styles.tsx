import styled, { css } from "styled-components";

import { type Status } from "~/domain/registration";
import { type Theme } from "~/theme.styles";

const registrationStatusColorKeys: {
  [key in Status]: Extract<
    keyof Theme["colors"],
    "primary" | "secondary" | "tertiary"
  >;
} = {
  REVIEW: "primary",
  APPROVED: "secondary",
  REPROVED: "tertiary",
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div<{ $status: Status; theme: Theme }>(
  ({ $status, theme }) => {
    const colorKey = registrationStatusColorKeys[$status];

    return css`
      height: auto;
      background-color: ${theme.colors[colorKey].main};
      border-radius: 32px;
      min-height: 80vh;
      max-height: 80vh;

      @media (max-width: 768px) {
        min-height: 0;
        max-height: unset;
      }
    `;
  }
);

export const TitleColumn = styled.h2<{ $status: Status; theme: Theme }>(
  ({ $status, theme }) => {
    const colorKey = registrationStatusColorKeys[$status];

    return css`
      color: ${theme.colors[colorKey].dark};
      margin: 24px;
      padding: 16px;
      font-size: ${theme.fontSize.md};
      font-weight: 600;
    `;
  }
);

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;
