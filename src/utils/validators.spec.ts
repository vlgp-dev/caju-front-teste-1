import { validateCpf } from "./validators";

describe("validateCpf", () => {
  it("should return false for CPF numbers with missing characters", () => {
    const input = "123.456.789";

    expect(validateCpf(input)).toBe(false);
  });

  it("should return false for CPF numbers with all same digits", () => {
    const input = "111.111.111-11";

    expect(validateCpf(input)).toBe(false);
  });

  it("should return false for invalid CPF numbers", () => {
    const input = "123.456.789-00";

    expect(validateCpf(input)).toBe(false);
  });

  it("should return true for valid CPF numbers", () => {
    const input = "123.456.789-09";

    expect(validateCpf(input)).toBe(true);
  });

  it("should return false for CPF numbers with more than 11 digits", () => {
    const input = "123.456.789-09123";

    expect(validateCpf(input)).toBe(false);
  });

  it("should return false for empty input", () => {
    const input = "";

    expect(validateCpf(input)).toBe(false);
  });

  it("should return false for non-numeric input", () => {
    const input = "abc.def.ghi-jk";

    expect(validateCpf(input)).toBe(false);
  });
});
