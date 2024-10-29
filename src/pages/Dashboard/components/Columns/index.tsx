import { useFilters } from "~/context/filter";
import { type Status } from "~/domain/registration";
import { useListRegistrations } from "~/hooks/registrations/useListRegistrations";

import RegistrationCard from "../RegistrationCard";
import RegistrationCardSkeleton from "../RegistrationCardSkeleton";

import * as S from "./styles";

type Column = {
  status: Status;
  title: string;
};

const allColumns: Column[] = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

const SKELETON_ARRAY = Array.from({ length: 3 }).fill("");

const SKELETON_DATA = {
  APPROVED: SKELETON_ARRAY,
  REPROVED: SKELETON_ARRAY,
  REVIEW: SKELETON_ARRAY,
};

const Columns = () => {
  const { cpf } = useFilters();

  const { data, isLoading, isFetching, isRefetching } =
    useListRegistrations(cpf);

  const shouldRenderSkeleton = isLoading || isFetching || isRefetching;

  return (
    <S.Container>
      {allColumns.map((collumn) => {
        return (
          <S.Column
            $status={collumn.status}
            key={collumn.title}
            data-testid="column"
          >
            <>
              <S.TitleColumn $status={collumn.status}>
                {collumn.title}
              </S.TitleColumn>
              <S.CollumContent>
                {!shouldRenderSkeleton
                  ? data?.[collumn.status]?.map((registration) => {
                      return (
                        <RegistrationCard
                          {...registration}
                          key={registration.id}
                        />
                      );
                    })
                  : SKELETON_DATA[collumn.status].map((_, index) => (
                      <RegistrationCardSkeleton key={index} />
                    ))}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Columns;
