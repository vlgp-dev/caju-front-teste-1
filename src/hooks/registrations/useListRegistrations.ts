import { queryOptions, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { groupRegistrationsByStatus } from "~/domain/registration";
import { Services } from "~/services";

export const listRegistrationsQueryOptions = (cpf?: string) => {
  const cpfKey = cpf ?? "";

  return queryOptions({
    queryKey: ["registrations", cpfKey],
    queryFn: async () => {
      try {
        return await Services.Registration.get(cpfKey);
      } catch (error) {
        toast.error("Ops! Algo deu errado. Tente novamente mais tarde.");
        return { data: [] };
      }
    },
  });
};

export function useListRegistrations(cpf?: string) {
  const result = useQuery({
    ...listRegistrationsQueryOptions(cpf),
    select: (data) => {
      return groupRegistrationsByStatus(data.data);
    },
  });

  return result;
}
