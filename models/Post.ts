import { DataTypes } from "sequelize";
import sequelize from "../db";


const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.STRING(30),
    primaryKey: true,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  userEmail: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: 'Users',
      key: 'email'
    },
  }
}, {
  updatedAt: false
});

export default Post;