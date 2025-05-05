import express, { Request, Response } from "express";
import crypto from "crypto";
import { validateCpf2 } from "./validateCpf2";

const app = express();
app.use(express.json());

const database: Record<string, any> = {};

function isValidFullName(name: string): boolean {
  const regex = /^\p{L}[\p{L}'\-]*(\s+\p{L}[\p{L}'\-]*)+$/u;
  return regex.test(name.trim());
}

function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email.trim())
}

function isValidPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,64}$/;
  return regex.test(password);
}


app.post('/signup', (req: Request, res: Response) => {
  const accountId = crypto.randomUUID();
  const account = req.body;
  console.info('signup')

  if (!isValidFullName(account.name)) {
    console.error('Invalid name')
    return res.status(422).json({ error: "Invalid name" });
  }
  if (!isValidEmail(account.email)) {
    console.error('Invalid email')
    return res.status(422).json({ error: "Invalid email" });
  }
  if (!validateCpf2(account.document)) {
    console.error('Invalid document')
    return res.status(422).json({ error: "Invalid document" });
  }
  if (!isValidPassword(account.password)) {
    console.error('Invalid password')
    return res.status(422).json({ error: "Invalid password" });
  }

  console.log('nome OK')

  console.info(`/signup:body: ${JSON.stringify(account)}`);
  account['accountId'] = accountId;
  database[accountId] = account;

  return res.status(201).json(database[accountId]);
});

app.get('/accounts/:accountId', async (request: Request, response: Response) => {
  const accountId = request.params.accountId;
  console.log(`database: ${JSON.stringify(database)}`);
  console.log(`accountId: ${accountId}`);

  if (database.hasOwnProperty(accountId)) {
    console.log('/accounts encontrou retorno');
    return response.status(200).json(database[accountId]);
  }

  console.error('não encontrou em /accounts');
  return response.status(422).json({ error: "Account not found" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});