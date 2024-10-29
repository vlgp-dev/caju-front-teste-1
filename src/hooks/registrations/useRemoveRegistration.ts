import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useFilters } from "~/context/filter";
import { Services } from "~/services";

import { listRegistrationsQueryOptions } from "./useListRegistrations";

export function useRemoveRegistration(id: string) {
  const queryClient = useQueryClient();

  const { cpf } = useFilters();

  const { queryKey } = listRegistrationsQueryOptions(cpf);

  const { mutateAsync, ...result } = useMutation({
    mutationKey: ["registrations", id],
    mutationFn: () => Services.Registration.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    ...result,
    remove: mutateAsync,
  };
}
