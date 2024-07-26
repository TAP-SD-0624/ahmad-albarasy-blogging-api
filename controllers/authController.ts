import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
import errorHandler from "../utils/errorHandler";
import APIError from "../utils/APIError";
import User from "../models/User";

const signToken = (email: string) =>
    jwt.sign({ email }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
});

const signUpController = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create({ name: req.body.name, email: req.body.email, password: req.body.password });
    res.status(201).json({
        status: 'success',
        user
    });
});

const loginController = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({where: { email: req.body.email, password: req.body.password }});
    if (!user){
        return next(new APIError('Invalid credintials.', 404));
    }
    const token: string = signToken(req.body.email); // create jwt for this user.
    res.status(200).json({
        status: 'success',
        token
    });
});

const logoutController = (req: Request, res: Response, next: NextFunction) => {
    const token: string = signToken(''); // create empty jwt to logout.
    res.status(200).json({
        status: 'success',
        token
    });
};

const methodNotSupported = (req: Request, res: Response) => {
	// sends a 405 response code that indicates that the method is not supported.
	res.status(405).json({
		status: "fail",
		message: `${req.method} not supported for this endpoint`,
	});
};

const loginRequired = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log('validating user...');
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new APIError('You are not authenticated, please sign up or login to do this action.', 403));
    }
    const decodedData = jwt.verify(token, process.env.JWT_KEY);
    if (!decodedData) {
        return next(new APIError('JWT Invalid or malformed.', 403));
    }
    const user = await User.findOne({where: { email: decodedData.email }});
    if (!user) {
        return next(new APIError('Something wrong happened, please login again.', 403));
    }
    // @ts-ignore
    req.user = decodedData.email;
    next();
});

export { signUpController, loginController, logoutController, methodNotSupported, loginRequired };