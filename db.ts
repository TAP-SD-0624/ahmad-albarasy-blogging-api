import { Sequelize } from 'sequelize';
import dbLogger from './utils/dbLogger';

const DB_NAME: string = process.env.DB_NAME || "blog_api";
const DB_USERNAME: string = process.env.DB_USERNAME || 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD || 'barasy10000';

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: dbLogger
});

export default sequelize;