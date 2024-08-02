import { onlyNumbersMask } from './onlyNumbersMask';

export default function cpfCnpjMask(value: string) {
  if (!value) {
    return value;
  }

  let mask = onlyNumbersMask(value);

  if (mask.length > 14) {
    mask = mask.substring(0, 14);
  }

  if (mask.length <= 11) {
    mask = mask.replace(/(\d{3})(\d)/, '$1.$2');
    mask = mask.replace(/(\d{3})(\d)/, '$1.$2');
    mask = mask.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else if (mask.length <= 14) {
    mask = mask.replace(/(\d{2})(\d)/, '$1.$2');
    mask = mask.replace(/(\d{3})(\d)/, '$1.$2');
    mask = mask.replace(/(\d{3})(\d)/, '$1/$2');
    mask = mask.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
  return mask;
}
