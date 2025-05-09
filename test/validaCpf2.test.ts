import { validateCpf2 } from "../src/validateCpf2";

test("Deve testar um cpf válido", async () => {
  // Given
  const cpf = "97456321558";

  // When
  const isValid = validateCpf2(cpf);

  // Then
  expect(isValid).toBe(true);
});


test("Deve testar um cpf válido com final zero", async () => {
  // Given
  const cpf = "71428793860";

  // When
  const isValid = validateCpf2(cpf);

  // Then
  expect(isValid).toBe(true);
});


test("Deve testar um cpf válido com final dois zeros", async () => {
  // Given
  const cpf = "87748248800";

  // When
  const isValid = validateCpf2(cpf);

  // Then
  expect(isValid).toBe(true);
});


test("Não deve validar null", async () => {
  // Given
  const cpf = null;

  // When
  // @ts-ignore
  const isInvalid = validateCpf2(cpf);

  // Then
  expect(isInvalid).not.toBe(true);
});

test("Não deve validar undefined", async () => {
  // Given
  const cpf = undefined;

  // When
  // @ts-ignore
  const isInvalid = validateCpf2(cpf);

  // Then
  expect(isInvalid).not.toBe(true);
});


test("Não deve validar vazio", async () => {
  // given
  const cpf = "";

  // when
  const isInvalid = validateCpf2(cpf);

  // then
  expect(isInvalid).not.toBe(true);
});

test("Não deve validar repetido", async () => {
  // given
  const cpf = "11111111111";
  // when
  const isInvalid = validateCpf2(cpf);
  // then
  expect(isInvalid).not.toBe(true);
});
