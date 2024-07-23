import { NextFunction, Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import User from "../models/User";
import APIError from "../utils/APIError";
import isEmail from "validator/lib/isEmail";

const getAllUsers = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll({ attributes: ['name', 'email'] });
    res.status(200).json({
        status: 'success',
        users
    });
});

const getUser = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ where: {
        email : req.params.email
    },
    attributes: [
        'name',
        'email'
        ]
    });
    if (!user)
        return next(new APIError('User not fonud.', 404));
    res.status(200).json({
        status: 'success',
        user
    });
});

const updateUser = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check if user exists
    const user = await User.findOne({ where: {
        email : req.params.email
    }});
    if (!user)
        return next(new APIError('User not found.', 404));
    const updatedUser = await User.update({ name: req.body.name, password: req.body.password }, { where: { email: req.params.email } });
    res.status(200).json({
        status: 'success',
        recordsAffected: updatedUser
    });
});

const deleteUser = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const deletedCount = await User.destroy({ where: { email: req.params.email }});
    if (deletedCount === 0) 
        return res.status(404).json({
            status: 'fail',
            message: 'User not found.'
        });

    res.status(204).json();
});
export { getAllUsers, getUser, updateUser, deleteUser };