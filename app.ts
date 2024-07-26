import express,{ Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorController from './controllers/errorController';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';
import categoryRouter from './routes/categoryRouter';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/auth', authRouter); // authentication routes.
app.use('/api/users', userRouter); // user routes.
app.use('/api/posts', postRouter); // post routes.
app.use('/api/categories', categoryRouter); // post routes.

app.route("*").all((req: Request, res: Response) =>
	res.status(404).json({
        status: "fail",
        message: "Endpoint not implemented."
    }),
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorController(err, req, res, next);
});

export default app;