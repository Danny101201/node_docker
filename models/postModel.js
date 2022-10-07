import mongoose from "mongoose"
const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,"post must have title"],
    unique:true
  },
  body:{
    type:String,
    required: [true,"post must have body"]
  },
})

export default mongoose.model('Post', postSchema)