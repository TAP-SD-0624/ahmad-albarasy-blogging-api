import app from '../app';
import sequelize from '../db';
import request from 'supertest';
import {syncModels, defineAssociations } from '../models/associateAndSync';
let token;

/* get JWT before performing tests that requires you to be logged in */

beforeAll(async () => {
	await defineAssociations();
	await syncModels();
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'ahmadanas@gmail.com', password: 'test12345' });
        token = res.body.token; // Adjust this according to your response structure
});

/* admin operations */

// 1. perform an admin operation without providing the admin password or providing a wrong password
describe('Get all users using a wrong admin password', () => {
    it('should return a 403 response that indicates that you are not allowed to do this action.', async () => {
        const res = await request(app).get('/api/admin/users').send({ adminPass: "wrongPass" });
        expect(res.status).toBe(403);
        expect(res.body.status).toEqual("fail");
    });
});

// 2. perform an admin operation with providing the correct admin password
describe('Get all users using the right admin password', () => {
    it('should return a 200 response with the list of the users registered in the database.', async () => {
        const res = await request(app).get('/api/admin/users').send({ adminPass: "X8m$R7v!kW3p@Z2q" });
        expect(res.status).toBe(200);
        expect(res.body.status).toEqual("success");
    });
});

/* auth routes */

// 1. Sign up with valid credintials
describe('Sign up a new user using valid credintials', () => {
    it('should return a 201 response with a new user object.', async () => {
        const res = await request(app).post('/api/auth/signup').send({
            email: "test@gmail.com",
            name: "Test", 
            password: "test1234",
            passwordConfirm: "test1234"
        });
        expect(res.status).toBe(201);
        expect(res.body.status).toEqual("success");
    });
});

// 2. Sign up with invalid credintials
describe('Sign up a new user using invalid credintials (using a password less than 8 characters)', () => {
    it('should return a 400 response with a message that says the password should be 8 char. minimum.', async () => {
        const res = await request(app).post('/api/auth/signup').send({
            email: "test@gmail.com",
            name: "Test", 
            password: "test123",
            passwordConfirm: "test123"
        });
        expect(res.status).toBe(400);
        expect(res.body.status).toEqual("fail");
    });
});

// 3. login with valid credintials
describe('Login using valid credintials', () => {
    it('should return a 200 response with a JWT in the response body.', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: "ahmadanas@gmail.com",
            password: "test12345"
        });
        expect(res.status).toBe(200);
        expect(res.body.status).toEqual("success");
    });
});

// 4. login with invalid credintials
describe('Login using invalid credintials', () => {
    it('should return a 404 response with a message that says the credintials is invalid', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: "ahmadanas@gmail.com",
            password: "wrongpassword1234"
        });
        expect(res.status).toBe(404);
        expect(res.body.status).toEqual("fail");
    });
});

/* user routes */

// 1. Get all users
describe('Get all users', () => {
    it('should return a 200 response with the list of the users registered in the database.', async () => {
        const res = await request(app).get('/api/admin/users').send({ adminPass: "X8m$R7v!kW3p@Z2q" });
        expect(res.status).toBe(200);
        expect(res.body.status).toEqual("success");
    });
});

// 2. Get a user that exists in the database
describe('Get a user that exists in the database', () => {
    it('should return a 200 response with an object that contains the user details.', async () => {
        const res = await request(app).get('/api/users/testuser@gmail.com').send({ adminPass: "X8m$R7v!kW3p@Z2q" });
        expect(res.status).toBe(200);
        expect(res.body.status).toEqual("success");
    });
});

// 3. Get a user that doesn't exist in the database
describe('Get a user that does not exist in the database', () => {
    it('should return a 404 response with a message that says the user is not found', async () => {
        const res = await request(app).get('/api/users/notfound@gmail.com').send({ adminPass: "X8m$R7v!kW3p@Z2q" });
        expect(res.status).toBe(404);
        expect(res.body.status).toEqual("fail");
    });
});

// 4. Update a user that exists in the database
describe('Update a user that exists in the database', () => {
    it('should return a 200 response with the number of records affected in the databse (should be one)', async () => {
        const res = await request(app).put('/api/admin/users').send({ adminPass: "X8m$R7v!kW3p@Z2q", email: "ahmadanas@gmail.com",name: `Test ${Math.random()}`  }); // to insure random naming thus an update would happen.
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.recordsAffected[0]).toBe(1);
    });
});

// 5. Update a user that doesn't exist in the database
describe('Update a user that does not exist in the database', () => {
    it('should return a 404 response with a message that says the user is not found', async () => {
        const res = await request(app).put('/api/admin/users/').send({ adminPass: "X8m$R7v!kW3p@Z2q", email: "nouser@gmail.com", name: "anything"  });
        expect(res.status).toBe(404);
        expect(res.body.status).toBe('fail');
    });
});

// 6. Delete a user that exists in the database
describe('Delete a user that exists in the database', () => {
    it('should return a 204 response with not content for the body', async () => {
        const res = await request(app).delete('/api/admin/users').send({ adminPass: "X8m$R7v!kW3p@Z2q", email: "test@gmail.com" }); // the user created above
        expect(res.status).toBe(204);
    });
});

// 7. Delete a user that doesn't exist in the database
describe('Delete a user that does not exist in the database', () => {
    it('should return a 404 response with a message that says the user is not found', async () => {
        const res = await request(app).delete('/api/admin/users').send({ adminPass: "X8m$R7v!kW3p@Z2q", email: "nouser@gmail.com" });
        expect(res.status).toBe(404);
        expect(res.body.status).toBe('fail');
    });
});

// 8. Send a request to the user routes using an HTTP method that is not supported
describe('Send a request to the user routes using PTACH method (not supported)', () => {
    it('should return a 405 response with a message that says the method is not supported for this endpoint', async () => {
        const res = await request(app).patch('/api/admin/users').send({ adminPass: "X8m$R7v!kW3p@Z2q", email: "nouser@gmail.com" });
        expect(res.status).toBe(405);
        expect(res.body.status).toBe('fail');
    });
});

/* post routes */

// 1. Get all posts
describe('Send a request to get all of the posts with their comments and categories', () => {
    it('should return a 200 response with a list of posts', async () => {
        const res = await request(app).get('/api/posts').set("Authorization", `Bearer ${token}`);
		console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
    });
});

// 1. Get an existing post by ID
describe('Send a request to get a post using the ID of the post', () => {
    it('should return a 200 response with an object that contains that post', async () => {
        const res = await request(app).get('/api/posts/just-some-thoughts').set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
    });
});

// 2. Get a post that doesn't exist by ID
describe('Send a request to get a post that does not exist using the ID of the post', () => {
    it('should return a 404 response with a message that says the post is not found', async () => {
        const res = await request(app).get('/api/posts/topic-ten').set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
        expect(res.body.status).toBe('fail');
    });
});

// 3. update an existing post
describe('Send a request to update an existing post that you as a user own (testing user: ahmadanas@gmail.com)', () => {
    it('should return a 200 response with no response body', async () => {
        const res = await request(app).put('/api/posts/topic-eight').set("Authorization", `Bearer ${token}`).send({ content: `Jokes on you, I'm a test user, Updated ${Date.now()}` });
        expect(res.status).toBe(204);
    });
});

// 4. update a post that doesn't exist
describe('Send a request to update a post that does not exist', () => {
    it('should return a 404 response', async () => {
        const res = await request(app).put('/api/posts/topic-ten').set("Authorization", `Bearer ${token}`).send({ content: 'Updated by test file!' });
        expect(res.status).toBe(404);
        expect(res.body.status).toBe('fail');
    });
});

// 5. update a post that isn't owned by you
describe('Send a request to update a post that is not owned by you (testing user: ahmadanas@gmail.com)', () => {
    it('should return a 404 response', async () => {
        const res = await request(app).put('/api/posts/just-some-thoughts').set("Authorization", `Bearer ${token}`).send({ content: 'Updated by test file!' });
        expect(res.status).toBe(404);
        expect(res.body.status).toBe('fail');
    });
});

// 5. create a post
describe('Send a request to create a post', () => {
    it('should return a 201 response (resource created).', async () => {
        const res = await request(app).post('/api/posts').set("Authorization", `Bearer ${token}`).send({
			postId: `topic-50`, // to insure the id are going to be unique
			content: 'Created from a test file!',
		});
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
    });
});

// 6. delete a post that belongs to you
describe('Delete a post that belongs to the test user (testing user: ahmadanas@gmail.com)', () => {
    it('should return a 204 response with no response body', async () => {
        const res = await request(app).delete('/api/posts/topic-50').set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(204);
    });
});

// 7. delete a post that doesn't belong to you
describe('Delete a post that does not belong to the test user (testing user: ahmadanas@gmail.com)', () => {
    it('should return a 404 response', async () => {
        const res = await request(app).delete('/api/posts/topic-one').set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
		expect(res.body.status).toBe('fail');
    });
});

// 8. create a comment on an existing post
describe('Create a comment on an existing post', () => {
    it('should return a 201 response (resource created)', async () => {
        const res = await request(app).post('/api/posts/just-some-thoughts/comments').set("Authorization", `Bearer ${token}`).send({
			content: "comment created from a test file!"
		});
        expect(res.status).toBe(201);
		expect(res.body.status).toBe('success');
    });
});

// 9. create a comment on a post that doesn't exist
describe('Create a comment on a post that does not exist', () => {
    it('should return a 404 response with a message that says the post is not fonud.', async () => {
        const res = await request(app).post('/api/posts/topic-ten/comments').set("Authorization", `Bearer ${token}`).send({
			content: "comment created from a test file!"
		});
        expect(res.status).toBe(404);
		expect(res.body.status).toBe('fail');
    });
});

// 10. add a category to a post that you don't own
describe('Add a category to a post that you do not own', () => {
    it('should return a 404 response with a message that says the post is not found.', async () => {
        const res = await request(app).post('/api/posts/topic-one/categories').set("Authorization", `Bearer ${token}`).send({
			categoryId: 1
		});
        expect(res.status).toBe(404);
		expect(res.body.status).toBe('fail');
    });
});

/* clean up and close connections after finishing the test suite. */
afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests
});