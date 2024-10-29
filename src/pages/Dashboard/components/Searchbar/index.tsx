import { FilterInput } from "../FilterInput";
import { NewAdmissionButton } from "../NewAdmissionButton";
import { RefreshButton } from "../RefreshButton";

import * as S from "./styles";

export const SearchBar = () => {
  return (
    <S.Container>
      <FilterInput />

      <S.Actions>
        <RefreshButton />
        <NewAdmissionButton />
      </S.Actions>
    </S.Container>
  );
};
