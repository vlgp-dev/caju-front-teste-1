import { type Registration } from "~/domain/registration";

import { RegistrationsServices } from "./registrations";

const httpClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

const registrationsServices = new RegistrationsServices(httpClient);

describe("RegistrationsServices", () => {
  it("should call get method with correct parameters", async () => {
    const cpf = "56642105087";

    await registrationsServices.get(cpf);

    expect(httpClient.get).toHaveBeenCalledWith({
      queryParams: { cpf },
      url: "/registrations",
    });
  });

  it("should call create method with correct parameters", async () => {
    const data: Omit<Registration, "id" | "status"> = {
      employeeName: "John Doe",
      email: "john.doe@example.com",
      cpf: "56642105087",
      admissionDate: "01/01/2024",
    };

    await registrationsServices.create(data);

    expect(httpClient.post).toHaveBeenCalledWith({
      url: "/registrations",
      body: { ...data, status: "REVIEW" },
    });
  });

  it("should call update method with correct parameters", async () => {
    const id = "1";
    const data: Partial<Omit<Registration, "id">> = { status: "APPROVED" };

    await registrationsServices.update(id, data);

    expect(httpClient.put).toHaveBeenCalledWith({
      url: `/registrations/${id}`,
      body: data,
    });
  });

  it("should call remove method with correct parameters", async () => {
    const id = "1";

    await registrationsServices.remove(id);

    expect(httpClient.delete).toHaveBeenCalledWith({
      url: `/registrations/${id}`,
    });
  });
});
