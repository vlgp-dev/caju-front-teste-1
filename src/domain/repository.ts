import { type Status, type Registration } from "./registration";

export interface RegistrationsRepository {
  list: (cpf: string) => Promise<Registration[]>;
  update: (id: string, newStatus: Status) => Promise<Registration>;
  remove: (id: string) => Promise<Registration>;
  create: (
    data: Omit<Registration, "id" | "status">
  ) => Promise<Registration[]>;
}
