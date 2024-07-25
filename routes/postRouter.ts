import express,{ Router } from 'express';
import { loginRequired } from '../controllers/authController';
import { getPost, createPost, deletePost } from '../controllers/postController';
import { methodNotSupported } from '../controllers/authController';

const postRouter: Router = express.Router();

postRouter.use(loginRequired);
postRouter.route('/').get(getPost).post(createPost).delete(deletePost);

postRouter.route('*').all(methodNotSupported);

export default postRouter;