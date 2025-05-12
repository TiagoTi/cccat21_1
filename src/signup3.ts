import express, {Request, Response} from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

interface Account {
  accountId: string
  name: string
  email: string
  document: string
}

interface AccountDb<Account> {
  [key: string]: Account;
}

const dbMem: AccountDb<Account> = {};

app.post('/signup', async (req: Request, res: Response) => {
  const accountId = crypto.randomUUID();
  const input = req.body;
  dbMem[accountId] = {
    accountId: accountId,
    name: input.name,
    email: input.email,
    document: input.document,
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
