import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/connection.js';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import { createClient } from './config/twilio.js';

dotenv.config({ path : '.env' });

//================== Mongodb server connection ==============================

connectDB();

//========== twilio setup ================

createClient();

//========================== Route imports ==========================

import userRoutes from './routes/userRouter.js';


const app = express();

//=========== Cors =================
app.use(cors({ origin: "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//setting up logger
app.use(logger("dev"));

//====================== Routing ==========================

app.use('/api/v1', userRoutes);


//====================== Error handling middleware ==========================

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started running on ${PORT}`));
