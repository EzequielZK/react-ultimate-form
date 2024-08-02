import { ValueValidationResponse } from './types';

export default function isValidPassword(
  password: string
): ValueValidationResponse {
  if (!password) {
    return { error: 'Por favor, insira uma senha válida' };
  }

  const validPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/.test(
    password
  );

  return {
    error: validPassword
      ? null
      : 'Senha inválida. Sua senha deve conter de 6 a 20 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  };
}
