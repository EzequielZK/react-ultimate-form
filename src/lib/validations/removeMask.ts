export default function removeMask(value: string) {
  return value ? value.replace(/[^\d]/g, '') : value;
}
