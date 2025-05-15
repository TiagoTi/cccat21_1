import axios from "axios";

const server = "http://localhost:3000";
axios.defaults.validateStatus = () => true;

test('deve criar uma conta', async () => {
  // given
  const inputSignup = {
    "name": "Tester user",
    "email": "tester@email.com",
    "document": "97456321558",
    "password": "Paww0rdsw"
  }

  // then
  const resSignup = await axios.post(`${server}/signup`, inputSignup);
  expect(resSignup.data.accountId).toBeDefined();

  const resAccount = await axios.get(`${server}/accounts/${resSignup.data.accountId}`)
  expect(resAccount.data).toHaveProperty("accountId");
  // when
  expect(resSignup.status).toBe(201);
  expect(resAccount.status).toBe(200);
  expect(resAccount.data.name).toBe(inputSignup.name)
  expect(resAccount.data.email).toBe(inputSignup.email)
  expect(resAccount.data.document).toBe(inputSignup.document)
  // TODO - crie uma forma de não retornar email e crie a expectativa para essa propiedade
  // não deve existir a propriedade password no get account
});

test('não deve criar uma conta com nome inválido', async () => {
  // given
  const inputSignup = {
    "name": "Tester",
    "email": "tester@email.com",
    "document": "97456321558",
    "password": "Paww0rdsw"
  }

  // then
  const resSignup = await axios.post(`${server}/signup`, inputSignup);
  expect(resSignup.status).toBe(422);
  expect(resSignup.data.error).toBe("Invalid name");
});


test('não deve criar uma conta com email inválido', async () => {
  // given
  const inputSignup = {
    "name": "Tester Useer",
    "email": "testeremail.com",
    "document": "97456321558",
    "password": "Paww0rdsw"
  }

  // then
  const resSignup = await axios.post(`${server}/signup`, inputSignup);
  expect(resSignup.status).toBe(422);
  expect(resSignup.data.error).toBe("Invalid email");
});

test('não deve criar uma conta com cpf inválido', async () => {
  // given
  const inputSignup = {
    "name": "Tester Useer",
    "email": "tester@email.com",
    "document": "9746321558",
    "password": "Paww0rdsw"
  }

  // then
  const resSignup = await axios.post(`${server}/signup`, inputSignup);
  expect(resSignup.status).toBe(422);
  expect(resSignup.data.error).toBe("Invalid document");
});

test('não deve criar uma conta com senha inválida', async () => {
  // given
  const inputSignup = {
    "name": "Tester Useer",
    "email": "tester@email.com",
    "document": "97456321558",
    "password": "Pawwrdsw"
  }

  // then
  const resSignup = await axios.post(`${server}/signup`, inputSignup);
  expect(resSignup.status).toBe(422);
  expect(resSignup.data.error).toBe("Invalid password");
});


