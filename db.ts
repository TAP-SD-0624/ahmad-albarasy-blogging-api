import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import dbLogger from './utils/dbLogger';

// Database credintials
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_NAME: string = process.env.DB_NAME || 'blog_api';
const DB_USERNAME: string = process.env.DB_USERNAME || 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD || 'barasy10000';
const DB_PORT = parseInt(process.env.DB_PORT || '3307');    

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: dbLogger
});

export default sequelize;