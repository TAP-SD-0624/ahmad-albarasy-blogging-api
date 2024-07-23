import app from './app';
import sequelize from './db';
import User from './models/User';
import Post from './models/Post';

const PORT: number | string = process.env.PORT || 80;

const syncModels = async () => {
    await User.sync({ alter: true });
	await Post.sync({ alter: true }); 
};

const startServer = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connected to database successfully.');
		// await syncModels(); call this function when needed.
		// console.log('Schemas has been synchronized successfully.');
		app.listen(PORT, () => 
			console.log(`Server is listening on port ${PORT}`
		));
	}
	catch (err: any){
		console.error(`Something wrong happened...`);
		console.error(err.message);
		process.exit(1); // non-zero exit code means an error has happened.
	}
};

startServer();