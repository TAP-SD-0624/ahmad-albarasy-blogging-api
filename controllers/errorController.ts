import { Request, Response, NextFunction } from 'express';
import APIError from '../utils/APIError';
import { ValidationError } from 'sequelize';

const errorController = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof APIError)
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message
    });
    if (err instanceof ValidationError)
        return res.status(400).json({
            status: 'fail',
            errors: err.errors.map((error) => error.message), // to get only errors messages.
    });
    res.status(500).json({
        status: 'error',
        message: err.message
    });
}

export default errorController;