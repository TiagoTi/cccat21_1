import {validateCpf} from '../../src/validateCpf'
test('deve validar um cpf', () => {
	// given
	const cpf = "97456321558"
	// when
	const valid = validateCpf(cpf);
	// then
	expect(valid).toBe(true);
})
