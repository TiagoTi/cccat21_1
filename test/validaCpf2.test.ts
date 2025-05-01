import { validateCpf2 } from "../src/validateCpf2";

test("Deve testar um cpf válido", async () => {
  // Given
  const cpf = "97456321558";

  // When
  const isValid = validateCpf2(cpf);

  // Then
  expect(isValid).toBe(true);
});

