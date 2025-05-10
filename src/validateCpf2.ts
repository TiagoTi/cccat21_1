const CLEAR_CPF_REGEX = /[.,\-\s]/g;

export function validateCpf2(str: string): boolean {
  if (str === null) return false;
  if (str === undefined) return false;
  str = sanitize(str, CLEAR_CPF_REGEX);
  if (str.length !== 11) return false;
  // tudo igual
  if (str.split("").every(c=> c===str[0])) return false;
  try {
    let d1, d2, dg1, dg2, digito, nDigResult;
    d1 = d2 = 0;
    dg1 = dg2 = 0;
    for (let nCount = 1; nCount < str.length -1; nCount ++){
      digito = parseInt(str.substring(nCount-1, nCount))
      d1 = d1 + (11 - nCount) * digito;
      d2 = d2 + (12 - nCount) * digito;
    }
    let rest = (d1 % 11);
    dg1 = (rest < 2) ? 0 : 11 - rest;
    d2 += 2 * dg1
    rest = (d2 % 11);
    if (rest < 2 )
      dg2 = 0;
    else
      dg2 = 11 -  rest;
    let  nDigVerific = str.substring(str.length-2, str.length)
    nDigResult = ""+dg1+""+dg2;
    return nDigVerific == nDigResult
  }catch(e){
    console.log('Erro: ' + e)
    return false

  }

  return false;
}

const sanitize = (s: string, pattern: RegExp):string => {
  return s.replace(pattern,'');
}
