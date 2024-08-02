export function onlyNumbersMask(value: string) {
  return value ? value.replace(/\D/g, '') : value;
}
