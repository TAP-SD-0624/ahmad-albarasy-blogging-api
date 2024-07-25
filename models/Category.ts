import { DataTypes } from "sequelize";
import sequelize from "../db";

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    createdAt: false,
    updatedAt: false
});

export default Category;