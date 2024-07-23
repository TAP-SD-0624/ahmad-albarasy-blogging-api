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

export { signUpController, loginController, logoutController, methodNotSupported };