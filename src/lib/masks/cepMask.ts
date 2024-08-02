import { onlyNumbersMask } from './onlyNumbersMask';

export default function cepMask(cep: string): string {
  if (!cep) {
    return cep;
  }

  let mask = onlyNumbersMask(cep);
  if (mask.length > 8) {
    mask = mask.substring(0, 8);
  }

  mask = mask.replace(/^([.\d]+)(\d{3})$/, '$1-$2');

  return mask;
}
