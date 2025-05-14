import express, {Request, Response} from "express";
import crypto from "crypto";
import {validateCpf} from "./validateCpf";

const app = express()
import pgPromise, { IDatabase, IMain } from 'pg-promise';

app.use(express.json());

const pgp: IMain = pgPromise();
const db: IDatabase<{}> = pgp("postgres://usr_admin_trading:123@192.168.10.3:5432/app_trading_dev");


( async ()=> {
try {
  const r = await db.query('select 1');
  console.log(db);
  console.log(`return: ${r}`)
}catch(e){
  console.error(`erro ao contectar ao postgres ${e}`)
  throw e;
}
})();
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
  if (invalidName(input.name)) return res.status(422).json({"error": "Invalid name"})
  if (invalidEmail(input.email)) return res.status(422).json({"error": "Invalid email"})
  if (!validateCpf(input.document)) return res.status(422).json({"error": "Invalid document"})
  if (invalidPassword(input.password)) return res.status(422).json({"error": "Invalid password"})

  /*dbMem[accountId] = {
    accountId: accountId,
    name: input.name,
    email: input.email,
    document: input.document,
    password: input.password,
  }
  */
  const {rows} = await db.query(
    "insert into ccca.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)",
    [accountId,input.name, input.email, input.document, input.password]
  )
  res.status(201).json({"accountId": accountId})
});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
  const accountId = req.params['accountId'];
  // const account = dbMem[accountId]
  const [account] = await db.query(
    "select account_id, name, email, document, password from ccca.account where account_id = $1", [accountId])
  account['accountId']=accountId;
  res.status(200).json(account)
});
app.listen(3000, ()=>{console.log('running')})
