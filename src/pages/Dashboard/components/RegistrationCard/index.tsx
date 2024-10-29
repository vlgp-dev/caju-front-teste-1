import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import Button from "~/components/Buttons";
import ConfirmationDialog from "~/components/ConfirmationDialog";
import { type Registration } from "~/domain/registration";

import * as S from "./styles";
import useRegistrationCard from "./useRegistrationCard";

interface RegistrationCardProps extends Registration {}

const RegistrationCard = (props: RegistrationCardProps) => {
  const { employeeName, email, admissionDate, status } = props;

  const {
    handleApprove,
    handleReprove,
    handleSendToReview,
    handleRemove,
    handleSubmit,
    handleSuccess,
    handleError,
    isLoading,
    dialogProps,
  } = useRegistrationCard(props);

  return (
    <>
      <S.Card data-testid="registration-card">
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          <div>
            {status === "REVIEW" ? (
              <>
                <Button
                  size="sm"
                  radius="sm"
                  appearance="danger"
                  onClick={handleReprove}
                >
                  Reprovar
                </Button>
                <Button
                  size="sm"
                  radius="sm"
                  appearance="success"
                  onClick={handleApprove}
                >
                  Aprovar
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                radius="sm"
                appearance="warning"
                onClick={handleSendToReview}
              >
                Revisar novamente
              </Button>
            )}
          </div>

          <button
            title="Remover"
            style={{ all: "unset" }}
            onClick={handleRemove}
          >
            <HiOutlineTrash />
          </button>
        </S.Actions>
      </S.Card>

      <ConfirmationDialog
        isOpen={dialogProps.isOpen}
        onOpenChange={dialogProps.onOpenChange}
        title={dialogProps.title}
        description={dialogProps.description}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </>
  );
};

export default RegistrationCard;
