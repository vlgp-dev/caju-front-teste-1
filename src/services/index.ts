import { AxiosHttpClient } from "./axiosHttpClient";
import { RegistrationsServices } from "./registrations";

const httpClient = new AxiosHttpClient(import.meta.env.VITE_API_ENDPOINT);

const registrationsServices = new RegistrationsServices(httpClient);

export const Services = {
  Registration: registrationsServices,
};
