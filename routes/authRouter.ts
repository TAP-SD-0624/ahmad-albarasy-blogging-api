import express,{ NextFunction, Response, Router } from 'express';
import { signUpController, loginController, logoutController, methodNotSupported } from '../controllers/authController';
import errorController from '../controllers/errorController';
import validateBody from '../middlewares/validateJsonBody';
import { signUpSchema, loginSchema } from '../utils/joiSchemas';

const authRouter: Router = express.Router();

authRouter.route('/signup').post(validateBody(signUpSchema), signUpController);
authRouter.route('/login').post(validateBody(loginSchema), loginController);
authRouter.route('/logout').post(logoutController);

authRouter.route('*').all(methodNotSupported);


authRouter.use(errorController);

export default authRouter;