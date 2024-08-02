import app from './app';
import sequelize from './db';
import { defineAssociations, syncModels } from './models/associateAndSync';

const PORT: number | string = process.env.PORT || 4000;


const startServer = async () => {
	try {
		app.listen(PORT, () => 
			console.log(`Server is listening on port ${PORT}`
		));
		await sequelize.authenticate();
		console.log('Connected to database successfully.');
		defineAssociations(); // to ensure associations are defined before getting any requests.
		await syncModels();
	}
	catch (err: any){
		console.error(`Something wrong happened..`);
		console.error(err.message);
		process.exit(1); // non-zero exit code means an error has happened.
	}
};

startServer(); // the server starts from here.