import express from 'express';
import {
  getAllPosts,
  createPost,
  updatePost,
  getOnePost,
  deletePost
} from '../controllers/postControllers.js';
import isAuth from '../middleware/authMiddleware.js'
const router = express.Router();

router
  .use(isAuth)
  .route('/')
  .get(getAllPosts)
  .post(createPost)

router
  .use(isAuth)
  .route('/:id')
  .get(getOnePost)
  .patch(updatePost)
  .delete(deletePost)
 export default router;