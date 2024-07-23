import { NextFunction, Request, Response } from "express";
import APIError from "../utils/APIError";
import isEmail from "validator/lib/isEmail";

const checkEmail = (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.email)
        return next(new APIError('email parameter is required.', 400));
    if (!isEmail(req.params.email))
        return next(new APIError('Invalid email.', 400));
    next();
};

export default checkEmail;