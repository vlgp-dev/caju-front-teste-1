import * as Dialog from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";

const showOverlay = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const showContent = keyframes`
  from { opacity: 0; transform: translate(-50%, 0) scale(0.9); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  inset: 0;
  animation: ${showOverlay} 150ms ease;
`;

export const DialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: ${showContent} 150ms ease;

  &:focus {
    outline: none;
  }

  & > form {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 32px;
  }
`;

export const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: black;
  font-size: 17px;

  & strong {
    font-weight: bold;
  }
`;

export const DialogDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
  color: black;
  font-size: 15px;
  line-height: 1.5;
`;
