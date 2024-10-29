import TextField from "~/components/TextField";
import { useFilters } from "~/context/filter";
import { FORMATTED_CPF_MAX_LENGTH } from "~/utils/constants";
import { maskCpf } from "~/utils/cpf-mask";

export const FilterInput = () => {
  const { hasError, cpfInputValue, onChange } = useFilters();

  return (
    <TextField
      placeholder="Digite um CPF válido"
      error={hasError ? "CPF inválido" : ""}
      value={maskCpf(cpfInputValue ?? "")}
      onChange={(event) => onChange(event.target.value)}
      maxLength={FORMATTED_CPF_MAX_LENGTH}
    />
  );
};
