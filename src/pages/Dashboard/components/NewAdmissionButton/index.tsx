import { useHistory } from "react-router-dom";

import Button from "~/components/Buttons";
import { useFilters } from "~/context/filter";
import routes from "~/router/routes";

export const NewAdmissionButton = () => {
  const history = useHistory();

  const { onChange: resetInputState } = useFilters();

  const goToNewAdmissionPage = () => {
    resetInputState("");
    history.push(routes.newUser);
  };

  return (
    <Button radius="lg" onClick={() => goToNewAdmissionPage()}>
      Nova Admissão
    </Button>
  );
};
