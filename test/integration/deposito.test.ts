import axios from 'axios';

axios.defaults.validateStatus = () => true;

test('deve realizar um deposito', async()=> {
  const inputSignup = {
    "name": "John Doe",
    "email": "jonh.doe@gmail.com",
    "document": "97456321558",
    "password": "asdQWE123"
  }
  const responseSignup = await axios.post('http://localhost:3000/signup', inputSignup);
  const outputSignup = responseSignup.data;

  const inputDeposit = {
    accountId: outputSignup.accountId,
    assetId: 'BTC',
    quantity: 10
  }
  await axios.post('http://localhost:3000/deposit', inputDeposit);
  const responseGetAccount =  await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.asset).toHaveLength(1);
});
