import { onlyNumbersMask } from './onlyNumbersMask';

export default function moneyMask(value: string) {
  if (!value) {
    return value;
  }

  let newValue = onlyNumbersMask(value);

  const counter = (value.length - 5) / 3;

  newValue = newValue.replace(/^([.\d]+)(\d{2})$/, 'R$ $1,$2');
  let i = 0;
  for (; i < counter; i++) {
    newValue = newValue.replace(/(\d+)(\d{3})([.,\d]+)$/, '$1.$2$3');
  }

  return newValue;
}
