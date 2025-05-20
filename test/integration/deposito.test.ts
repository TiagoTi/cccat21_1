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
  expect(outputGetAccount.assets).toHaveLength(1);
  const asset = outputGetAccount.assets[0];
  expect(asset.assetId).toBe("BTC");
  expect(asset.quantity).toBe(10);
});

test('deve realizar um saque', async()=> {
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
  const inputWithdraw = {
    accountId: outputSignup.accountId,
    assetId: 'BTC',
    quantity: 5
  }
  await axios.post('http://localhost:3000/withdraw', inputWithdraw);
  const responseGetAccount =  await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
  const outputGetAccount = responseGetAccount.data;

  expect(outputGetAccount.assets).toHaveLength(1);
  const asset = outputGetAccount.assets[0];
  expect(asset.quantity).toBe(5);
});
