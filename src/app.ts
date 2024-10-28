// console.log("Hi, hello, vanakkam");

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/router'

dotenv.config({path:'./src/config/config.env'});

const app=express();

app.use(express.json());
app.use('/api/',router);

const mongodbUrl=process.env.MONGODB_URL as string;

mongoose.connect(mongodbUrl)
    .then(()=>console.log("MongoDB cloud got connected"))
    .catch(err=>console.error("Error connecting to the mongodb",err));

app.listen(process.env.PORT,()=>console.log("connected to port 8181"));