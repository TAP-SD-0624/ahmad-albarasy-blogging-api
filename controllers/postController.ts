import Post from "../models/Post";
import Comment from "../models/Comment";
import User from "../models/User";
import APIError from "../utils/APIError";
import errorHandler from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";
import formatDateToMySQL from "../utils/formatDateToSql";
import { Op } from "sequelize";
import Category from "../models/Category";
import PostCategory from "../models/PostCategory";

const getAllPosts = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.findAll({
        include: [
            { model: Comment, attributes: ['content', 'userEmail'] },
            { model: Category, attributes: ['name'] }
        ]
    });
    res.status(200).json({
        status: 'success',
        posts: posts || "No posts yet."
    });
});

const createPost = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { postId, content } = req.body; 
    // @ts-ignore
    const post = await Post.create({ id: postId, content, userEmail: req.user, createdAt: formatDateToMySQL(new Date()) });
    res.status(201).json({
        status: 'success',
        post
    });
});

const updatePost = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	// @ts-ignore
    const email = req.user;
    const postId = req.params.postId; 
	// check if post belongs to the user trying to update it
	const post = await Post.findOne({ 
		where: {
			userEmail: email,
			id: postId
		}
	});
	if (!post)
		return next(new APIError('Post not found.', 404)); // indicates that the post is not found or you are not allowed to perform this action.
	const updated = await Post.update({ content: req.body.content }, {
		where: {
			userEmail: email,
			id: postId
		}
	});
	if (updated[0] === 0)
		res.status(200).json({
			status: 'success',
			message: 'Nothing to update.'
	});
	res.status(204).json();
});

const deletePost = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const email = req.user;
    let deleted: number;
    if (req.baseUrl.startsWith('/api/admin')){
        const { postId } = req.body;
        deleted = await Post.destroy({
            where: {
                id: postId
            }
        });

    }
    else {
        const postId = req.params.postId;
        if (!postId)
            return next(new APIError('no postId provided.', 400));
        deleted = await Post.destroy({
            where: {
                [Op.and]: [
                    {userEmail : email},
                    { id: postId }
                ]
            }
        });
    }
    if (!deleted)
        return next(new APIError('Post not found.', 404)); // means that the post is not found or you are not allowed to do this action
    res.status(204).json();
});

const getPost = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    if (!postId)
        return next(new APIError('no postId provided.', 400));
    const post = await Post.findOne({
        where: { id: postId },
        attributes: { 
            exclude: ['userEmail'] 
        },
        include: [
            {
                model: User,
                attributes: ['name', 'email']
            },
            { 
                model: Category,
                attributes: ['name'] 
            }
        ]
    });
    if (!post)
        return next(new APIError('Post not found.', 404));
    const comments = await Comment.findAll({ 
        where: { postId }
     });
    res.status(200).json({
        status: 'success',
        post,
        comments: comments || "no comments yet."
    });
});

const getPostCategories = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    if (!postId)
        return next(new APIError('no postId provided.', 400));
    const categories = await Post.findOne({
        where: {
            id: postId
        },
        attributes:{
            exclude: ['id', 'content', 'userEmail', 'createdAt']
        },
        include: [
            {
                model: Category,
            }
        ]
    });
    if (!categories)
        return next(new APIError('Post not found.', 404));
    res.status(200).json({
        status: 'success',
        categories
    });
});

const addCategoryToPost = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const email = req.user;
    const { categoryId } = req.body;
    const post = await Post.findOne({
        where: {
            [Op.and]: [
                { userEmail : email },
                { id: req.params.postId }
            ]
        }
    });
    if (!post)
        return next(new APIError('Post not found', 404)); // means that the post is not found or you are not allowed to do this action
    // check if category exists
    const category = await Category.findOne({ 
        where: {
            id : categoryId
        }
     });
     if (!category)
        return next(new APIError('No category found with that ID', 404));
    // create a record in PostCategories table
    const postCategory = await PostCategory.create({ 
        postId: req.params.postId,
        categoryId
     });
     res.status(201).json({
        status: 'success',
        postCategory
     });
});

const removePostCategory = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const email = req.user;
    const { id } = req.body;
    const post = await Post.findOne({
        where: {
            [Op.and]: [
                { userEmail : email },
                { id: req.params.postId }
            ]
        }
    });
    if (!post)
        return next(new APIError('Post not found', 404)); // means that the post is not found or you are not allowed to do this action
    // check if category exists
    const category = await Category.findOne({ 
        where: {
            id
        }
     });
     if (!category)
        return next(new APIError('No category found with that ID', 404));
    const deleted: number = await PostCategory.destroy({
        where: {
            postId: req.params.postId,
            categoryId: id

        }
    });
    if (! deleted)
        return next(new APIError('This category is not associated to this post', 404));
    res.status(204).json();
});

export { getPost, 
	createPost, 
	deletePost,
	updatePost, 
	getPostCategories, 
	addCategoryToPost, 
    removePostCategory,
	getAllPosts };