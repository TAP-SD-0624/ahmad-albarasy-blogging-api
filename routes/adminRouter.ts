import express,{ Router } from 'express';
import adminAuth from '../middlewares/authenticateAdmin';
import validateBody from '../middlewares/validateJsonBody';
import { 
    createUserSchema, 
    updateUserSchema, 
    deleteUserSchema,
    deletePostSchema,
    createCategorySchema,
    deleteCategorySchema,
    deleteCommentSchema 
    } from '../utils/joiSchemas';
import { 
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser 
    } from '../controllers/userController';
import { methodNotSupported } from '../controllers/authController';
import { deletePost } from '../controllers/postController';
import { deleteComment } from '../controllers/commentController';
import { createCategory, deleteCategory } from '../controllers/categoryController';

const adminRouter: Router = express.Router();

adminRouter.use(adminAuth); // to protect the route for the admin to use only.

adminRouter.route('/users')
    .get(getAllUsers)
    .post(validateBody(createUserSchema), createUser)
    .put(validateBody(updateUserSchema), updateUser)
    .delete(validateBody(deleteUserSchema), deleteUser);

adminRouter.route('/posts')
    .delete(validateBody(deletePostSchema), deletePost);

adminRouter.route('/comments')
    .delete(validateBody(deleteCommentSchema), deleteComment);

adminRouter.route('/categories')
    .post(validateBody(createCategorySchema), createCategory)
    .delete(validateBody(deleteCategorySchema), deleteCategory)

adminRouter.route('*').all(methodNotSupported); // to handle requests with invalid methods that gets sent to the admin endpoints.


export default adminRouter;