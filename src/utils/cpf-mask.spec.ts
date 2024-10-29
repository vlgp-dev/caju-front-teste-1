// cpf-mask.spec.ts
import { maskCpf, unmaskCpf } from "./cpf-mask";

describe("maskCpf", () => {
  it("should format a CPF number correctly", () => {
    const input = "12345678909";
    const expectedOutput = "123.456.789-09";

    expect(maskCpf(input)).toBe(expectedOutput);
  });

  it("should handle CPF numbers with less than 11 digits", () => {
    const input = "123456789";
    const expectedOutput = "123.456.789";

    expect(maskCpf(input)).toBe(expectedOutput);
  });

  it("should handle CPF numbers with more than 11 digits", () => {
    const input = "12345678909123";
    const expectedOutput = "123.456.789-09";

    expect(maskCpf(input)).toBe(expectedOutput);
  });

  it("should handle empty input", () => {
    const input = "";
    const expectedOutput = "";

    expect(maskCpf(input)).toBe(expectedOutput);
  });

  it("should handle non-numeric input", () => {
    const input = "abc";
    const expectedOutput = "";

    expect(maskCpf(input)).toBe(expectedOutput);
  });
});

describe("unmaskCpf", () => {
  it("should remove formatting from a CPF number correctly", () => {
    const input = "123.456.789-09";
    const expectedOutput = "12345678909";
    expect(unmaskCpf(input)).toBe(expectedOutput);
  });
});
