import dotenv from 'dotenv';
import express,{ Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorController from './controllers/errorController';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/auth', authRouter); // authentication routes.
app.use('/api/users', userRouter); // user routes.

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