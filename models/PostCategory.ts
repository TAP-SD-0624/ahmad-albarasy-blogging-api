import sequelize from "../db";
import { DataTypes } from "sequelize";

const PostCategory = sequelize.define('PostCategory', {
    postId: {
    type: DataTypes.STRING(30),
        references: {
            model: 'Posts',
            key: 'id'
        },
        primaryKey: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'id'
        },
        primaryKey: true
    }
},
{ timestamps: false });

export default PostCategory;