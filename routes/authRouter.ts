import express,{ Router } from 'express';
import { 
    signUpController, 
    loginController, 
    logoutController, 
    methodNotSupported 
    } from '../controllers/authController';
import errorController from '../controllers/errorController';
import validateBody from '../middlewares/validateJsonBody';
import { signUpSchema, loginSchema } from '../utils/joiSchemas';

const authRouter: Router = express.Router();

authRouter.route('/signup').post(validateBody(signUpSchema), signUpController);
authRouter.route('/login').post(validateBody(loginSchema), loginController);
authRouter.route('/logout').post(logoutController);

authRouter.route('*').all(methodNotSupported); // to handle requests with invalid methods that gets sent to the auth endpoints.


authRouter.use(errorController);

export default authRouter;