import {
  type ReactNode,
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";

import { useHistory, useLocation } from "react-router-dom";

import { unmaskCpf } from "~/utils/cpf-mask";
import { validateCpf } from "~/utils/validators";

interface FiltersContextProps {
  cpf: string;
  cpfInputValue: string;
  onChange: (cpf: string) => void;
  hasError: boolean;
}

const FiltersContext = createContext<FiltersContextProps>({
  cpf: "",
  cpfInputValue: "",
  onChange: () => {},
  hasError: false,
});

interface ServicesContextProviderProps {
  children: ReactNode;
}

export function FiltersProvider(props: ServicesContextProviderProps) {
  const location = useLocation();
  const history = useHistory();

  const [cpfInputValue, setCpfInputValue] = useState(
    new URLSearchParams(location.search).get("cpf") ?? ""
  );

  const cpf = useMemo(
    () => new URLSearchParams(location.search).get("cpf") ?? "",
    [location.search]
  );

  const setCpf = useCallback(
    (value: string) => {
      const unmaskedValue = unmaskCpf(value);

      setCpfInputValue(unmaskedValue);

      const isCpfValid = validateCpf(unmaskedValue);

      const search = new URLSearchParams(location.search);
      const currentCpfSearchParam = search.get("cpf") ?? "";

      if (isCpfValid) {
        search.set("cpf", unmaskedValue);
      } else {
        search.delete("cpf");
      }

      const newCpfSearchParam = search.get("cpf") ?? "";

      if (currentCpfSearchParam !== newCpfSearchParam) {
        history.push({ search: search.toString() });
      }
    },
    [history, location.search]
  );

  useEffect(() => {
    if (history.action === "POP") {
      setCpf(cpf);
    }
  }, [cpf, history.action, setCpf]);

  return (
    <FiltersContext.Provider
      value={{
        cpfInputValue,
        cpf,
        onChange: setCpf,
        hasError: cpf !== cpfInputValue,
      }}
    >
      {props.children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  return useContext(FiltersContext);
}
