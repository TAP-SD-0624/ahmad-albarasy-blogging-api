import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import Comment from "../models/Comment";
import Post from "../models/Post";
import APIError from "../utils/APIError";
import formatDateToMySQL from "../utils/formatDateToSql";

const getPostComments = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params.postId;
    console.log(postId);
    // check if post exists
    const post = await Post.findOne({
        where:{
            id: postId    
        }
    });
    if (!post)
        return next(new APIError('Post not found.', 404));
    const comments = await Comment.findAll({
        where: {
            postId: postId
        }
    });
    if (comments.length === 0)
        return res.status(200).json({
            status: 'success',
            comments: 'This post has no comments yet.'
    });
    res.status(200).json({
        status: 'success',
        comments
    });
});

const createComment = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	// @ts-ignore
	const email = req.user;
    const postId = req.params.postId;
    const { content } = req.body;
    const post = await Post.findOne({ 
        where: {
            id: postId
        }
    });
	if (!post)
		return next(new APIError('Post not found.', 404));
	const comment = await Comment.create({ 
		postId: postId,
		userEmail: email,
		content: content,
		createdAt: formatDateToMySQL(new Date())
	});
	res.status(201).json({
		status: 'success',
		comment
	});
});

export { getPostComments, createComment };

