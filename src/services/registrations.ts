import { type Registration } from "~/domain/registration";
import { type HttpClient } from "~/interfaces/httpClient";

export class RegistrationsServices {
  constructor(private readonly httpClient: HttpClient) {}

  get = async (cpf?: string) => {
    return await this.httpClient.get<Registration[]>({
      url: "/registrations",
      queryParams: { cpf: cpf ?? "" },
    });
  };

  create = async (data: Omit<Registration, "id" | "status">) => {
    return await this.httpClient.post({
      url: "/registrations",
      body: { ...data, status: "REVIEW" },
    });
  };

  update = async (
    id: Registration["id"],
    data: Partial<Omit<Registration, "id">>
  ) => {
    return await this.httpClient.put<void, typeof data>({
      url: `/registrations/${id}`,
      body: data,
    });
  };

  remove = async (id: Registration["id"]) => {
    return await this.httpClient.delete({
      url: `/registrations/${id}`,
    });
  };
}
