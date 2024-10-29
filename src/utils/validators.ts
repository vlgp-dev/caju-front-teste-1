import { CPF_MAX_LENGTH } from "./constants";
import { unmaskCpf } from "./cpf-mask";

export function validateCpf(cpf: string) {
  cpf = unmaskCpf(cpf);

  if (cpf.length !== CPF_MAX_LENGTH) return false;

  const isSameDigits = /^(\d)\1+$/.test(cpf);
  const isMissingCharacters = cpf.length !== CPF_MAX_LENGTH;

  if (isMissingCharacters || isSameDigits) return false;

  const calculateDigit = (base: number) => {
    let sum = 0;
    for (let i = 0; i < base; i++) {
      sum += parseInt(cpf[i]) * (base + 1 - i);
    }

    const remainder = (sum * 10) % CPF_MAX_LENGTH;

    return remainder === 10 ? 0 : remainder;
  };

  const digit1 = calculateDigit(9);
  const digit2 = calculateDigit(10);

  return digit1 === Number(cpf[9]) && digit2 === Number(cpf[10]);
}
