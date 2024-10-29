import styled from "styled-components";

import { _IconButtonStyled } from "~/components/Buttons/IconButton";
import { Button } from "~/components/Buttons/styles";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  max-width: 500px;
  width: 100%;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${_IconButtonStyled} {
    margin-bottom: 8px;
    align-items: flex-start;
  }

  ${Button} {
    align-self: flex-end;
  }
`;
