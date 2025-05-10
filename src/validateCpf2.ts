const CLEAR_CPF_REGEX = /[.,\-\s]/g;
const CPF_LEN = 11;

export function validateCpf2(str: string): boolean {
  if (isInvalid(str)) return false;
  str = sanitize(str, CLEAR_CPF_REGEX);
  if (str.length !== CPF_LEN) return false;
  if (str.split("").every(c=> c===str[0])) return false;
  let d1 = 0, d2 = 0;
  for (let nCount = 1; nCount < CPF_LEN -1; nCount ++){
    const digit = parseInt(str.substring(nCount-1, nCount))
    d1 = d1 + (CPF_LEN - nCount) * digit;
    d2 = d2 + (12 - nCount) * digit;
  }
  let rest = (d1 % CPF_LEN);
  const dg1 = (rest < 2) ? 0 : CPF_LEN - rest;
  d2 += 2 * dg1
  rest = (d2 % CPF_LEN);
  const dg2 = (rest < 2 ) ? 0 : CPF_LEN -  rest;
  let  nDigVerific = str.substring(CPF_LEN-2, CPF_LEN)
  return nDigVerific == `${dg1}${dg2}`;
}
const sanitize = (s: string, pattern: RegExp):string => s.replace(pattern,'');
const isInvalid = (i: any): boolean => i === null || i === undefined;
