import { Sequelize } from 'sequelize';
import dbLogger from './utils/dbLogger';

const DB_NAME: string = process.env.DB_NAME || "blog_api";
const DB_USERNAME: string | undefined = process.env.DB_USERNAME || 'ahmad';
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD || 'Test1234';

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: dbLogger
});

export default sequelize;