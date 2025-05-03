import axios from "axios";

const server = "http://localhost:3000";

test.only('deve criar uma conta', async () => {
  // given
  const inputSignup = {
    "name": "tester",
    "email": "tester@email.com",
    "document": "22747148866",
    "pasword": "P@ssw0rd"
  }
  // then
  const responseSignUp =  await axios.post(`${server}/signup`);
  expect(responseSignUp.data).toHaveProperty("accountId");
  const accountId = responseSignUp.data.accountId;
  const responseAccountResponse = await axios.get(`${server}/accounts/${accountId}`)

  // when
  expect(responseSignUp.status).toBe(201);
  expect(responseAccountResponse.status).toBe(200);
  expect(typeof accountId).toBe("string");

});
