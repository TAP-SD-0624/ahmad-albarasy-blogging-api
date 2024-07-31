import { NextFunction, Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import User from "../models/User";
import APIError from "../utils/APIError";

const getAllUsers = errorHandler(async (req: Request, res: Response) => {
    const users = await User.findAll({ attributes: ['name', 'email'] });
    res.status(200).json({
        status: 'success',
        users
    });
});

const createUser = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({
        status: 'success',
        user
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
    const { email, name } = req.body;
    // check if user exists
    const user = await User.findOne({ where: {
        email
    }});
    if (!user)
        return next(new APIError('User not found.', 404));
    const updatedUser = await User.update({ name }, { where: { email } });
    res.status(200).json({
        status: 'success',
        recordsAffected: updatedUser
    });
});

const deleteUser = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const deletedCount = await User.destroy({ where: { email }});
    if (deletedCount === 0) 
        return next(new APIError('User not found.', 404));
    res.status(204).json();
});
export { getAllUsers, createUser, getUser, updateUser, deleteUser };