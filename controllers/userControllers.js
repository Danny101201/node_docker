import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
export const signUp = async (req, res, next) => {
  try{
    const { userName, password, email } = req.body
    const duplicatesUser = await User.findOne({ email })
    if (duplicatesUser) return res.status(400).json({message:'email has been signup'})
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = await (await User.create({ userName, password: hashPassword, email })).save();
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
    const verifiedPassword = await bcrypt.compare(password,user.password);
    console.log({ user, verifiedPassword })
    if (!user || !verifiedPassword) return res.status(400).json({message:'invalidate password or email'});
    res.status(200).json({
      status:'success',
      message:'login success'
    });
  }catch(e){
    res.status(400).json({
      status:'fail',
    })
  }
}