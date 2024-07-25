import { DataTypes } from "sequelize";
import sequelize from "../db";

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    postId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        references: {
            model: 'Posts',
            key: 'id',
        }
    },
    userEmail: {
		type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'Users',
            key: 'email'
        }
	},
},
{
    updatedAt: false,
});

export default Comment;

