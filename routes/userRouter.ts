import express,{ Router } from 'express';
import { methodNotSupported } from '../controllers/authController';
import adminAuth from '../middlewares/authenticateAdmin';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController';
import validateBody from '../middlewares/validateJsonBody';
import { updateUserSchema } from '../utils/joiSchemas';
import checkEmail from '../middlewares/userRoutesEmailCheck';

const userRouter: Router = express.Router();

userRouter.use(adminAuth); // to allow only the admin to perform these operations.

userRouter.route('/').get(getAllUsers);

// userRouter.use(); // to check req.params.email and validate it.

userRouter.route('/:email').get(checkEmail, getUser)
    .put(checkEmail, validateBody(updateUserSchema), updateUser)
    .delete(checkEmail, deleteUser);

userRouter.route('*').all(methodNotSupported);

export default userRouter;

