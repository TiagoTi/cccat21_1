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
