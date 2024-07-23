import { Request, Response, NextFunction } from "express";
import APIError from "../utils/APIError";

const validateBody = (getSchema: Function) => (req: Request, res: Response, next: NextFunction) => {
    const schema = getSchema();
    const { error } = schema.validate(req.body);
    if (error)
        return next(new APIError(error.message, 400));
    next();
};

export default validateBody;
