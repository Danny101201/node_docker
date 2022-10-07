import mongoose from "mongoose"
const uerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User must have userName"],
  },
  email: {
    type: String,
    required: [true, "User must have email"]
  },
  password: {
    type: String,
    required: [true, "User must have password"]
  },
})

export default mongoose.model('User', uerSchema)