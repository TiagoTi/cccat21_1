import {invalidPassword} from "../../src/invalidPassword";
test("Deve validar uma senha", () => {
  const pass = "AAaa11AA";
  const isValid = !invalidPassword(pass);
  expect(isValid).toBe(true);
});

test("senha sem digito é invalida", () => {
  const pass = "AAaaabAA";
  const isInvalid = invalidPassword(pass);
  expect(isInvalid).toBe(true);
});

test("senha sem minuscula é invalida", () => {
  const pass = "AAAAAAA8";
  const isInvalid = invalidPassword(pass);
  expect(isInvalid).toBe(true);
});

test("senha sem maiusculas é invalida", () => {
  const pass = "aaaaaaa8";
  const isInvalid = invalidPassword(pass);
  expect(isInvalid).toBe(true);
});
test("senha menor que 8 é invalida", () => {
  const pass = "AAaa11A";
  const isInvalid = invalidPassword(pass);
  expect(isInvalid).toBe(true);
});
