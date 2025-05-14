const CLEAR_CPF_REGEX = /[.,\-\s]/g;
const CPF_LEN = 11;

export function validateCpf2(cpf: string): boolean {
  if (isInvalid(cpf)) return false;
  cpf = sanitize(cpf, CLEAR_CPF_REGEX);
  if (invalidLength(cpf)) return false;
  if (sameChar(cpf)) return false;
  return validate(cpf);
}
const isInvalid = (i: any): boolean => i === null || i === undefined;
const sanitize = (s: string, pattern: RegExp):string => s.replace(pattern,'');
const invalidLength = (s: string): boolean => s.length !== CPF_LEN;
const sameChar = (s: string): boolean => s.split("").every(c=> c===s[0]);
const validate = (cpf: string): boolean => {
  let d1 = 0, d2 = 0;
  for (let nCount = 1; nCount < CPF_LEN -1; nCount ++){
    const digit = parseInt(cpf.substring(nCount-1, nCount))
    d1 = d1 + (CPF_LEN - nCount) * digit;
    d2 = d2 + (12 - nCount) * digit;
  }
  let rest = (d1 % CPF_LEN);
  const dg1 = (rest < 2) ? 0 : CPF_LEN - rest;
  d2 += 2 * dg1
  rest = (d2 % CPF_LEN);
  const dg2 = (rest < 2 ) ? 0 : CPF_LEN -  rest;
  let  nDigVerific = cpf.substring(CPF_LEN-2, CPF_LEN)
  return nDigVerific == `${dg1}${dg2}`;
}
