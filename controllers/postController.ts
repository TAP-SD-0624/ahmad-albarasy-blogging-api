import Post from "../models/Post";
import APIError from "../utils/APIError";
import errorHandler from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";

const createPost = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.create({ id: 'testpost', content: 'this is a simple post', userEmail: 'ahmadbarasy@gmail.com', createdAt: '01-01-2024' });
    res.status(200).json({
        status: 'success',
        post
    });
});

const deletePost = errorHandler(async (req: Request, res: Response, next: NextFunction) => {

});

const getPost = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.query.postId;
    if (!postId)
        return next(new APIError('no postId provided.', 400));
    const post = await Post.findOne({ where: { postId } });
    if (!post)
        return next(new APIError('Post not found.', 404));
    res.status(200).json({
        status: 'success',
        post
    });
});

export { getPost, createPost, deletePost };