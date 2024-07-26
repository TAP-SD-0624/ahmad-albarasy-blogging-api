import User from "./User";
import Post from "./Post";  
import Comment from "./Comment";
import Category from "./Category";
import PostCategory from "./PostCategory";
import sequelize from "../db";

const defineAssociations = () => {
    User.hasMany(Post, { foreignKey: 'userEmail', onDelete: 'CASCADE' });
    Post.belongsTo(User, { foreignKey: 'userEmail' });
    User.hasMany(Comment, { foreignKey: 'userEmail', onDelete: 'CASCADE' });
    Comment.belongsTo(User, { foreignKey: 'userEmail' });
    Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE'});
    Comment.belongsTo(Post, { foreignKey: 'postId' });
    Post.belongsToMany(Category, { through: PostCategory, foreignKey: 'postId', otherKey: 'categoryId' });
    Category.belongsToMany(Post, { through: PostCategory, foreignKey: 'categoryId', otherKey: 'postId' });
};

const syncModels = async () => {
	await sequelize.sync();
};

export { defineAssociations, syncModels };