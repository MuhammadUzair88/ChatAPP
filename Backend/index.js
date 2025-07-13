
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthROutes from './routes/AuthRoutes.js'
import MessageRoutes from './routes/MessageRoutes.js'
import { app, server } from './SocketIO/server.js';

// const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();



server.listen(process.env.PORT,()=>{
    console.log(`Server is Started At ${process.env.PORT} `)
})



app.use("/api/auth",AuthROutes );
app.use("/api/message",MessageRoutes );

//database Connection

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Database Connected Successfully");
  })
  .catch((error) => {
    console.error("❌ Error In Database Connection:", error.message);
  });


app.get('/', (req, res) => {
  res.send('Welcome to the API backend!');
});


