import { NextFunction, Request, Response } from "express";
import APIError from "../utils/APIError";

const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.adminPass)
        return next(new APIError('You are not allowed to preform this action', 403));
    if (req.body.adminPass !== process.env.ADMIN_PASS)
        return next(new APIError('You are not allowed to preform this action', 403));
    next();
};

export default adminAuth;