class APIError extends Error { // a class to create errors that hold error message and status code.
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default APIError;
