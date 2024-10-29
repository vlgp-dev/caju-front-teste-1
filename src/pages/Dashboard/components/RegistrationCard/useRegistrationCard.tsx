import { useState } from "react";

import { toast } from "react-toastify";

import { type Status, type Registration } from "~/domain/registration";
import { useRemoveRegistration } from "~/hooks/registrations/useRemoveRegistration";
import { useUpdateRegistration } from "~/hooks/registrations/useUpdateRegistration";

type Actions = Status | "REMOVED";

const ACTIONS_DICTIONARY: Record<Actions, string> = {
  REVIEW: "revisar novamente",
  APPROVED: "aprovar",
  REPROVED: "reprovar",
  REMOVED: "remover",
};

const SUCCESS_MESSAGE_BY_ACTION: Record<Actions, string> = {
  REVIEW: "Pronto! Registro enviado para revisão.",
  APPROVED: "Pronto! Registro aprovado com sucesso.",
  REPROVED: "Pronto! Registro reprovado com sucesso.",
  REMOVED: "Pronto! Registro removido com sucesso.",
};

const useRegistrationCard = (registration: Registration) => {
  const { id, employeeName } = registration;

  const [nextStatus, setNextStatus] = useState<Actions | undefined>(undefined);

  const { update, isPending: isUpdating } = useUpdateRegistration(id);
  const { remove, isPending: isRemoving } = useRemoveRegistration(id);

  const handleApprove = () => setNextStatus("APPROVED");
  const handleReprove = () => setNextStatus("REPROVED");
  const handleSendToReview = () => setNextStatus("REVIEW");
  const handleRemove = () => setNextStatus("REMOVED");

  const handleSubmit = async () => {
    if (!nextStatus) return;

    if (nextStatus === "REMOVED") {
      await remove();
      return;
    }

    await update({ ...registration, status: nextStatus });
  };

  const handleSuccess = () => {
    if (!nextStatus) return;
    const message = SUCCESS_MESSAGE_BY_ACTION[nextStatus];
    toast.success(message);
  };

  const handleError = () => {
    toast.error("Ops! Algo deu errado. Tente novamente mais tarde.");
  };

  const dialogProps = {
    isOpen: Boolean(nextStatus),
    onOpenChange: () => setNextStatus(undefined),
    title: nextStatus ? (
      <>
        Deseja <strong>{ACTIONS_DICTIONARY[nextStatus]}</strong> o registro de{" "}
        {employeeName}?
      </>
    ) : undefined,
    description:
      nextStatus === "REMOVED"
        ? "Essa ação não poderá ser desfeita. Tem certza que deseja continuar?"
        : undefined,
  };

  return {
    handleApprove,
    handleReprove,
    handleSendToReview,
    handleRemove,
    handleSubmit,
    handleSuccess,
    handleError,
    isLoading: isUpdating || isRemoving,
    dialogProps,
  };
};

export default useRegistrationCard;
