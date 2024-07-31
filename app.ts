import express,{ Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorController from './controllers/errorController';
import authRouter from './routes/authRouter';
import postRouter from './routes/postRouter';
import adminRouter from './routes/adminRouter';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // to log http requests.

app.use('/api/auth', authRouter); // authentication routes.
app.use('/api/admin', adminRouter); // admin routes.
app.use('/api/posts', postRouter); // post routes.

app.route("*").all((req: Request, res: Response) => // to handle requests that are sent to unimplemented endpoints.
	res.status(404).json({
        status: "fail",
        message: "Endpoint not implemented."
    }),
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorController(err, req, res, next);
}); // pass errors to the global error controller.

export default app;