import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import dbLogger from './utils/dbLogger';

// Database credintials
const DB_HOST: string = process.env.DB_HOST || "sql7.freesqldatabase.com";
const DB_NAME: string = process.env.DB_NAME || "sql7722348";
const DB_USERNAME: string = process.env.DB_USERNAME || 'sql7722348';
const DB_PASSWORD: string = process.env.DB_PASSWORD || 'H2jAQlQ6mT';


const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: dbLogger
});

export default sequelize;