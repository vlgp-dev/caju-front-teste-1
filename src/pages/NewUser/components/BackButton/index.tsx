import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";

const BackButton = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <IconButton onClick={() => goToHome()} aria-label="back">
      <HiOutlineArrowLeft size={24} />
    </IconButton>
  );
};

export default BackButton;
