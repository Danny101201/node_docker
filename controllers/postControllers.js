import Post from '../models/postModel.js';
export const getAllPosts = async (req, res, next) => {
  try{
    const posts = await Post.find().select('-body');
    res.status(200).json({
      status:'success',
      results: posts.length,
      data:{
        posts
      }
    });
  }catch(e){
    res.status(400).json({
      status:'fail'
    })
  }
}
export const getOnePost = async (req, res, next) => {
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status:'success',
      data:{
        post
      }
    });
  }catch(e){
    res.status(400).json({
      status:'fail'
    })
  }
}
export const createPost = async (req, res, next) => {
  try{
    const { title, body } = req.body
    const duplicates = await Post.findOne({ title: title})
    if (duplicates) return res.status(401).json({message:'title has been used'})
    const post = await Post.create({
      title,
      body
    });
    res.status(200).json({
      status:'success',
      data:{
        post
      }
    });
  } catch (error){
    console.log(error)
    res.status(400).json({
      status:'fail'
    })
  }
}
export const updatePost = async (req, res, next) => {
  try{
    const {title,body}=req.body
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(401).json({ message: 'found not has post' })
    const newpost = await Post.findByIdAndUpdate(req.params.id,{
      title:title,
      body:body
    },{
      new:true,
      runValidators:true
    });
    res.status(200).json({
      status:'success',
      data:{
        newpost
      }
    });
  }catch(e){
    res.status(400).json({
      status:'fail'
    })
  }
}
export const deletePost = async (req, res, next) => {
  try{
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status:'delete success',
    });
  }catch(e){
    res.status(400).json({
      status:'fail'
    })
  }
}
