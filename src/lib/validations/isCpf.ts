import { ValueValidationResponse } from './types';

export default function isCpf(cpf: string): ValueValidationResponse {
  if (!cpf) {
    return { error: 'Insira um CPF Válido' };
  }

  if (cpf.length !== 11) {
    return { error: 'CPF deve conter até 11 caracteres' };
  }

  const cpfSameNumbers = checkCpfSameNumbers(cpf);
  if (cpfSameNumbers) {
    return { error: 'Insira um CPF Válido' };
  }

  const firstIdNumberTest = cpf.substring(0, 9);
  const secondIdNumberTest = cpf.substring(0, 10);

  const firstVerifyingDigit = calculateCpf(firstIdNumberTest, 'first');
  const secondVerifyingDigit = calculateCpf(secondIdNumberTest, 'second');

  const firstDigitValid = String(firstVerifyingDigit) === cpf.charAt(9);
  const secondDigitValid = String(secondVerifyingDigit) === cpf.charAt(10);
  return { error: firstDigitValid && secondDigitValid ? null : 'CPF inválido' };
}

function calculateCpf(cpf: string, order: 'first' | 'second') {
  const multiplyingNumbers = {
    first: [10, 9, 8, 7, 6, 5, 4, 3, 2],
    second: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
  };

  const multiplyingSequence = multiplyingNumbers[order];

  const { length } = cpf;
  let i = 0;
  const results = [];
  for (; i < length; i++) {
    const result = Number(cpf.charAt(i)) * multiplyingSequence[i];
    results.push(result);
  }

  const resultsSum = results.reduce((prev, current) => prev + current);
  const rest = resultsSum % 11;

  if (11 - rest >= 10) {
    return 0;
  }
  return 11 - rest;
}

function checkCpfSameNumbers(Cpf: string) {
  let equalNumbersCount = 0;
  const singleNumbers = [];

  let i = 0;
  for (; i < 11; i++) {
    const char = Cpf.charAt(i);
    if (singleNumbers.indexOf(char) > -1) {
      equalNumbersCount++;
    } else {
      singleNumbers.push(char);
    }
  }
  if (equalNumbersCount === 11) {
    return true;
  }
  return false;
}
