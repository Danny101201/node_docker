import express from 'express';
const app = express();
import path from 'path';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { fileURLToPath } from 'url'
import { connectDB } from './db/connect.js';
import postRouter from './routes/postRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000
const host = process.env.SERVERBASEURL 

app.use(express.json())
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'))
})
app.use(`${host}/posts`, postRouter)
app.use(`${host}/user`, userRouter)
app.listen(port,()=>{
  connectDB();
  console.log(`server run on ports  ${port}`);
})