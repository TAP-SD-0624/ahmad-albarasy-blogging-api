import express,{ Router } from 'express';
import { loginRequired } from '../controllers/authController';
import { getPost, getAllPosts, createPost, updatePost, deletePost, getPostCategories, addCategoryToPost } from '../controllers/postController';
import { methodNotSupported } from '../controllers/authController';
import validateBody from '../middlewares/validateJsonBody';
import { createCommentSchema, createPostSchema, updatePostSchema, addCategoryToPostSchema } from '../utils/joiSchemas';
import { createComment, getPostComments } from '../controllers/commentController';

const postRouter: Router = express.Router();

postRouter.use(loginRequired);

postRouter.route('/:postId/comments').get(getPostComments)
    .post(validateBody(createCommentSchema), createComment);

postRouter.route('/:postId/categories').get(getPostCategories)
    .post(validateBody(addCategoryToPostSchema), addCategoryToPost);
    
postRouter.route('/:postId')
    .get(getPost)
    .put(validateBody(updatePostSchema), updatePost)
    .delete(deletePost);
postRouter.route('/').get(getAllPosts).post(validateBody(createPostSchema), createPost);


postRouter.route('*').all(methodNotSupported);

export default postRouter;