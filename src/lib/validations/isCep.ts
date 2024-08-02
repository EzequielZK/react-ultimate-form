import removeMask from './removeMask';
import { ValueValidationResponse } from './types';

export default function isCep(value: string): ValueValidationResponse {
  if (!value) {
    return { error: 'Insira um número de CEP válido' };
  }
  const cepWithoutMask = removeMask(value);
  const validPhone = cepWithoutMask && cepWithoutMask.length === 8;

  return {
    error: validPhone ? '' : 'CEP inválido',
  };
}
