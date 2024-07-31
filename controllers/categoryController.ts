import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import Category from "../models/Category";
import APIError from "../utils/APIError";

const createCategory = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id, name } = req.body;
    const category = await Category.create({ id, name });
    res.status(201).json({
        status: 'success',
        category
    });
});

const deleteCategory = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const deleted = await Category.destroy({ 
        where: {
            id
        }
    });
    if (!deleted)
        return next(new APIError('Category not found.', 404));
    res.status(204).json();
});

export { createCategory, deleteCategory };