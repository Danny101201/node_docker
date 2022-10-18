import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
export const signUp = async (req, res, next) => {
  try{
    const { userName, password, email } = req.body
    const duplicatesUser = await User.findOne({ email })
    if (duplicatesUser) return res.status(400).json({message:'email has been signup'})
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = await (await User.create({ userName, password: hashPassword, email })).save();
    req.session.user = newUser
    res.status(200).json({
      status:'success',
      data:{ 
        newUser
      }
    });
  }catch(e){
    res.status(400).json({
      status:'fail',
    })
  }
}
export const login = async (req, res, next) => {
  try{
    const { password, email } = req.body
    const user = await User.findOne({ email })
    const isCorrectPassWord = await bcrypt.compare(password, user.password);
    if (isCorrectPassWord) {
      req.session.user = user
      return res.status(200).json({
        status: 'success',
        message: 'login success',
      });
    } else {
      return res.status(400).json({ message: 'invalidate password or email' });
    }

  }catch(e){
    res.status(400).json({
      status:'fail',
    })
  }
}