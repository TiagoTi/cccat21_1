import {invalidName} from "../../src/invalidName";

test("Deve valida o nome", () => {
  const name="Jonh Doe";
  const isValid = !invalidName(name);
  expect(isValid).toBe(true);
});
test("Deve invalidar nome menor que 3", () => {
  const name="J";
  const isInvalid = invalidName(name);
  expect(isInvalid).toBe(true);
});
test("Deve invalidar nome de uma palavra", () => {
  const name="Joe";
  const isInvalid = invalidName(name);
  expect(isInvalid).toBe(true);
});
