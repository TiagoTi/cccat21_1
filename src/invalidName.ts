
export const invalidName = (name: string):boolean => {
  if (name.length < 3) return true;
  const regex = /^\w+\s+\w+.*$/;
  return !regex.test(name);
}

