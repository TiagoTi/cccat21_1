const CLEAR_CPF_REGEX = /[.,\-\s]/g;
const CPF_LEN = 11;

export function validateCpf2(str: string): boolean {
  if (str === null) return false;
  if (str === undefined) return false;
  str = sanitize(str, CLEAR_CPF_REGEX);
  if (str.length !== CPF_LEN) return false;
  if (str.split("").every(c=> c===str[0])) return false;
  let d1 = 0, d2 = 0;
  for (let nCount = 1; nCount < str.length -1; nCount ++){
    const digit = parseInt(str.substring(nCount-1, nCount))
    d1 = d1 + (CPF_LEN - nCount) * digit;
    d2 = d2 + (12 - nCount) * digit;
  }
  let rest = (d1 % CPF_LEN);
  const dg1 = (rest < 2) ? 0 : CPF_LEN - rest;
  d2 += 2 * dg1
  rest = (d2 % CPF_LEN);
  let dg2 = CPF_LEN -  rest;
  if (rest < 2 )
    dg2 = 0;
  let  nDigVerific = str.substring(str.length-2, str.length)
  return nDigVerific == `${dg1}${dg2}`;
}

const sanitize = (s: string, pattern: RegExp):string => {
  return s.replace(pattern,'');
}
