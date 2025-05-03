import express from "express";
import { Router, Request, Response} from "express";
import crypto from "crypto";

const application =  express();
const route = Router();

const database = {};

route.post('/signup', async (request: Request, response: Response)=>{
  const accountId = crypto.randomUUID();
  response.status(201).json({"accountId": accountId})
}
);
route.get('/accounts/:accountId', async (request: Request, response: Response)=>{
  const accountId = request.params.accountId;
  //database.hasOwnProtperty(accountId);
  response.status(200).json({"accountId": accountId})
}
);

application.use(route);

application.listen(3000,()=>'on 3000');
