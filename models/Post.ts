import { DataTypes } from "sequelize";
import sequelize from "../db";

const Post = sequelize.define('post', {
    postId: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
},
{
	updatedAt: false
});

export default Post;