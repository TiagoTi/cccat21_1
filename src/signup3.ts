import express, {Request, Response} from "express";
import crypto from "crypto";
import {validateCpf} from "./validateCpf";

const app = express();
app.use(express.json());

interface Account {
  accountId: string
  name: string
  email: string
  document: string
  password: string
}

interface AccountDb<Account> {
  [key: string]: Account;
}

const dbMem: AccountDb<Account> = {};

function invalidPassword (password: string) {
    if (password.length < 8) return true;
    if (!password.match(/\d+/)) return true;
    if (!password.match(/[a-z]+/)) return true;
    if (!password.match(/[A-Z]+/)) return true;
    return false;
}
const invalidName = (name: string):boolean => {
  const regex = /^\w+\s+\w+.*$/;
  return !regex.test(name);
}

const invalidEmail = (email: string):boolean => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return !regex.test(email);
}

app.post('/signup', async (req: Request, res: Response) => {
  const accountId = crypto.randomUUID();
  const input = req.body;
  if (invalidName(input.name)) return res.status(422).json({"error": "Invalid Name"})
  if (invalidEmail(input.email)) return res.status(422).json({"error": "Invalid Email"})
  if (!validateCpf(input.document)) return res.status(422).json({"error": "Invalid Document"})
  if (invalidPassword(input.password)) return res.status(422).json({"error": "Invalid Password"})

  dbMem[accountId] = {
    accountId: accountId,
    name: input.name,
    email: input.email,
    document: input.document,
    password: input.password,
  }
  res.status(201).json({"accountId": accountId})
  console.log('oi')
});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
  const accountId = req.params['accountId'];
  console.log('oi')
  console.log(`get by accountId: ${accountId}`)
  const account = dbMem[accountId]
  console.info(`account found? ${account}`)
  res.status(200).json(dbMem[accountId])
});
app.listen(3000, ()=>{console.log('running')})
