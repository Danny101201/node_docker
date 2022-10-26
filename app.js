import express from 'express';
const app = express();
import path from 'path';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import session from "express-session"
import connectRedis from "connect-redis"
import cors from 'cors';
// redis@v4
import { createClient } from "redis"
import { fileURLToPath } from 'url'
import { connectDB } from './db/connect.js';
import postRouter from './routes/postRoutes.js';
import userRouter from './routes/userRoutes.js';

import config from './config/config.js'
let RedisStore = connectRedis(session)
let redisClient = createClient({
  legacyMode: true,
  url: `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
  username: 'default',
  password: process.env.NODE_ENV === 'production' ? 'eGnzuP5YD96z7tVmltRpUgDQfRIXgfPW' : ''
})
redisClient.connect().catch(console.error)

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000
const host = process.env.SERVERBASEURL 

app.use(express.json())
// set to req.session
// 執行此操作時會添加 X-Forwarded-For 標頭屬性，以便您的代理（nginx）可以看到原始 url 是什麼
app.enable('trust proxy')
app.use(cors({}))
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: config.SESSION_SECRET,
    cookie: {
      // user 只能透過https連線你的web才能回傳cookie,如果是為true需要新增信任網域 https://expressjs.com/zh-tw/guide/behind-proxies.html
      secure: false,
      // 強制將session存回 session store, 即使它沒有被修改
      resave: false,
      // 強制將未初始化的session存回 session store，未初始化的意思是它是新的而且未被修改。
      saveUninitialized: false,
      // 不能透過瀏覽器的開發者工具寫js腳本讀取cookie
      httponly: true,
      maxAge: 30000,
    }
  })
)
app.get(`${host}`, (req, res) => {
  // res.sendFile(path.join(__dirname,'index.html'))
  res.send("<h2>Hi there !!!fff</h2>")

  console.log('yeah it run')
})
app.use(`${host}/posts`, postRouter)
app.use(`${host}/user`, userRouter)
app.listen(port,()=>{
  connectDB();
  console.log(`server run on ports  ${port}`);
})


