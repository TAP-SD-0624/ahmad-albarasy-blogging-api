import { DataTypes } from "sequelize";
import sequelize from "../db";


const User = sequelize.define('User', {
	name: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(50),
		primaryKey: true,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false
	}
},
{
	createdAt: false,
	updatedAt: false
});

export default User;