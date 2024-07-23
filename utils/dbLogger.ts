import { blue } from "colorette";

const dbLogger = (message: string) => {
    console.log(blue(`[Sequelize]: ${message}`));
}; 

export default dbLogger;