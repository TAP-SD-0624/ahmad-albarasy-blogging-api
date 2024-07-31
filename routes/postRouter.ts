import express,{ Router } from 'express';
import { loginRequired } from '../controllers/authController';
import { getPost, 
    getAllPosts, 
    createPost, 
    updatePost, 
    deletePost, 
    getPostCategories, 
    addCategoryToPost,
    removePostCategory 
    } from '../controllers/postController';
import { methodNotSupported } from '../controllers/authController';
import validateBody from '../middlewares/validateJsonBody';
import { 
    createCommentSchema, 
    createPostSchema, 
    updatePostSchema, 
    addCategoryToPostSchema,
    removePostCategorySchema 
    } from '../utils/joiSchemas';
import { createComment, 
    getPostComments } from '../controllers/commentController';

const postRouter: Router = express.Router();

postRouter.use(loginRequired);

postRouter.route('/:postId/comments')
    .get(getPostComments)
    .post(validateBody(createCommentSchema), createComment);

postRouter.route('/:postId/categories')
    .get(getPostCategories)
    .post(validateBody(addCategoryToPostSchema), addCategoryToPost)
    .delete(validateBody(removePostCategorySchema), removePostCategory);
    
postRouter.route('/:postId')
    .get(getPost)
    .put(validateBody(updatePostSchema), updatePost)
    .delete(deletePost);
postRouter.route('/').get(getAllPosts)
    .post(validateBody(createPostSchema), createPost);


postRouter.route('*').all(methodNotSupported); // to handle requests with invalid methods that gets sent to the post endpoints.

export default postRouter;