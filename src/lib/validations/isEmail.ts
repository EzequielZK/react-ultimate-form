import { ValueValidationResponse } from './types';

export default function isEmail(value: string): ValueValidationResponse {
  if (!value) {
    return { error: 'Insira um e-mail válido' };
  }
  value.trim();
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
  return {
    error: validEmail ? null : 'E-mail inválido',
  };
}
