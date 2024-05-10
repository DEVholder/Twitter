import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import {config} from './config.js';
import { connectDB } from "./db/database.js";

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next)=>{
  res.sendStatus(404);
})

connectDB().then((db)=>{
  console.log('Mongoose MongoDB')
  app.listen(config.host.port, ()=>{
    console.log(`listen http://localhost:${config.host.port}`)
  });
}).then(console.error);





