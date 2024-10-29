import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useFilters } from "~/context/filter";
import { type Registration } from "~/domain/registration";
import { Services } from "~/services";

import { listRegistrationsQueryOptions } from "./useListRegistrations";

export function useUpdateRegistration(id: string) {
  const { cpf } = useFilters();

  const { queryKey } = listRegistrationsQueryOptions(cpf);

  const queryClient = useQueryClient();

  const { mutateAsync, ...result } = useMutation({
    mutationFn: (data: Omit<Registration, "id">) =>
      Services.Registration.update(id, data),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    ...result,
    update: mutateAsync,
  };
}
