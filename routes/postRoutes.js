import express from 'express';
import {
  getAllPosts,
  createPost,
  updatePost,
  getOnePost,
  deletePost
} from '../controllers/postControllers.js';
const router = express.Router();

router
  .route('/')
  .get(getAllPosts)
  .post(createPost)

router
  .route('/:id')
  .get(getOnePost)
  .patch(updatePost)
  .delete(deletePost)
 export default router;