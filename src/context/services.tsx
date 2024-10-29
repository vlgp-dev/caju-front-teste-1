import { type ReactNode, createContext, useContext } from "react";

import { type RegistrationsRepository } from "~/domain/repository";

interface ServicesContextProps {
  registrationsRepository: RegistrationsRepository;
}

const ServicesContext = createContext<ServicesContextProps | undefined>(
  undefined
);

interface ServicesContextProviderProps extends ServicesContextProps {
  children: ReactNode;
}

export function RegistrationsContextProvider(
  props: ServicesContextProviderProps
) {
  return (
    <ServicesContext.Provider
      value={{
        registrationsRepository: props.registrationsRepository,
      }}
    >
      {props.children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  return useContext(ServicesContext);
}
