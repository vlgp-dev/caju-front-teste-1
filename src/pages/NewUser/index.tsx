import BackButton from "./components/BackButton";
import NewAdmissionForm from "./Form";
import * as S from "./styles";

const NewUserPage = () => {
  return (
    <S.Container>
      <S.Card>
        <BackButton />

        <NewAdmissionForm />
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
