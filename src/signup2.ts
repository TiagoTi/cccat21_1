import express from "express";
import { Router, Request, Response} from "express";
import crypto from "crypto";

const application =  express();
const route = Router();

const database = {};

route.post('/signup', async (request: Request, response: Response)=>{
  const accountId = crypto.randomUUID();
  const account = request.body
  account[accountId] = accountId
  database[accountId] = account
  response.status(201).json({"accountId": accountId})
}
);
route.get('/accounts/:accountId', async (request: Request, response: Response)=>{
  const accountId = request.params.accountId;
  if( database.hasOwnProperty.call(database, accountId)){
    response.status(200).json(database[accountId])
  }
}
);

application.use(route);

application.listen(3000,()=>'on 3000');
