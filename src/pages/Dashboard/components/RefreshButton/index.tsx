import { memo } from "react";

import { HiRefresh } from "react-icons/hi";

import { IconButton } from "~/components/Buttons/IconButton";
import { useFilters } from "~/context/filter";
import { useListRegistrations } from "~/hooks/registrations/useListRegistrations";

export const RefreshButton = memo(() => {
  const { cpf } = useFilters();

  const { refetch } = useListRegistrations(cpf);

  return (
    <IconButton onClick={() => refetch()} aria-label="atualizar">
      <HiRefresh />
    </IconButton>
  );
});
