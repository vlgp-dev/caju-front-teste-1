export function maskCpf(value: string) {
  value = unmaskCpf(value);

  if (value.length > 6) {
    const first = value.slice(0, 3);
    const second = value.slice(3, 6);
    const third = value.slice(6, 9);
    const fourth = value.slice(9, 11);

    return (value = `${first}.${second}.${third}${
      value.length > 9 ? `-${fourth}` : ""
    }`);
  }
  if (value.length > 3) {
    const first = value.slice(0, 3);
    const second = value.slice(3, 6);

    return (value = `${first}.${second}`);
  }

  return value;
}

export function unmaskCpf(value: string) {
  return value.replace(/\D/g, "");
}
