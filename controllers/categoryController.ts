import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import Category from "../models/Category";

const createCategory = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id, name } = req.body;
    const category = await Category.create({ id, name });
    res.status(201).json({
        status: 'success',
        category
    });
});

export { createCategory };