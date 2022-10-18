import mongoose from "mongoose";
import config from '../config/config.js'
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = config
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
export const connectDB = async()=>{

  const connect = await mongoose.connect(mongoURL,{
  }).then(()=>{
    console.log('Connected successfully to DB server ');
  }).catch(err=>{
    console.log(err + ' restart db server')
    setTimeout(connectDB,5000)
  });
  mongoose.connection.on('connected', () => {
    console.log('Connected to Db successfully to server ');
  })
  mongoose.connection.on('error', (err) => {
    console.log('Error while connecting to database' + err);
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Error while connecting disconnected');
  })

}
