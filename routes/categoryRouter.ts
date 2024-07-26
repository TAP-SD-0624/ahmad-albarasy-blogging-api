import express,{ Router } from 'express';
import { loginRequired, methodNotSupported } from '../controllers/authController';
import { createCategory } from '../controllers/categoryController';
import validateBody from '../middlewares/validateJsonBody';
import { createCategorySchema } from '../utils/joiSchemas';

const categoryRouter: Router = express.Router();

categoryRouter.use(loginRequired);

categoryRouter.route('/').post(validateBody(createCategorySchema), createCategory);

categoryRouter.route('*').all(methodNotSupported);

export default categoryRouter;