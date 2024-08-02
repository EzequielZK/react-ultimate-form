import removeMask from './removeMask';
import { ValueValidationResponse } from './types';

export default function isPhone(value: string): ValueValidationResponse {
  if (!value) {
    return { error: 'Insira um número de celular válido' };
  }
  const phoneWithoutMask = removeMask(value);
  const validPhone = phoneWithoutMask && phoneWithoutMask.length === 11;

  return {
    error: validPhone ? null : 'Número inválido!',
  };
}
