import { type ReactElement } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import Button from "../Buttons";

import * as S from "./styles";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactElement | string;
  description?: string;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

function ConfirmationDialog(props: ConfirmationDialogProps) {
  const {
    isOpen,
    onOpenChange,
    title,
    description = "",
    onSubmit,
    isLoading,
    onSuccess,
    onError,
  } = props;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <S.DialogOverlay />
        <S.DialogContent
          onPointerDownOutside={(event) => {
            if (isLoading) {
              event.preventDefault();
            }
          }}
        >
          {title && <S.DialogTitle>{title}</S.DialogTitle>}
          <S.DialogDescription>{description}</S.DialogDescription>
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              try {
                await onSubmit();
                onSuccess?.();
              } catch (error) {
                onError?.();
              } finally {
                onOpenChange(false);
              }
            }}
          >
            <Dialog.Close asChild>
              <Button appearance="danger" size="sm" disabled={isLoading}>
                Voltar
              </Button>
            </Dialog.Close>
            <Button
              type="submit"
              appearance="success"
              size="sm"
              disabled={isLoading}
            >
              {isLoading ? "Confirmando..." : "Confirmar"}
            </Button>
          </form>
        </S.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ConfirmationDialog;
