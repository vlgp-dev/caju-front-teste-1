import { useMutation } from "@tanstack/react-query";

import { type Registration } from "~/domain/registration";
import { Services } from "~/services";

export function useCreateRegistrations() {
  const { mutateAsync, ...result } = useMutation({
    mutationFn: (data: Omit<Registration, "id" | "status">) =>
      Services.Registration.create(data),
  });

  return {
    ...result,
    create: mutateAsync,
  };
}
