import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import connectMongo from './db/db.js';
import cors from 'cors';
import connectionsRoute from './routes/connectionsRoute.js';
import stationsRoute from './routes/stationsRoute.js';

dotenv.config();

let currentDate = new Date();
let time = currentDate.getHours() + ":" + currentDate.getMinutes();

(async () => {
  try {

    const conn = await connectMongo();

    if (conn) {
      console.log(`[${time}] Connected successfully.`);
    }

    const app = express();
    
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cors());

    app.use('/station', stationsRoute);

    app.listen({port: 3000}, () =>
        console.log(`[${time}] Server ready at localhost:3000`),);
  } catch (e) {
    console.log('server error: ' + e.message);
  }
})();