import { NextFunction, Request, Response } from "express";

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => { // to wrap controllers calls in a call that has a catch nested to it. 
    fn(req, res, next).catch((err: Error) => next(err));
};

export default errorHandler;
