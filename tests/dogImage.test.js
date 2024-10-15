const request = require('supertest');
const { app } = require("../server"); // Import your Express app
const {sequelize} = require("../connections")
const path = require('path');

const setupDatabase = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    // You can seed test data here if needed
};
beforeAll(async () => {
    // Connect to the database
    await setupDatabase(); 
});

afterAll(async () => {
    await sequelize.truncate({ cascade: true, restartIdentity: true }); // Drops all tables
    await sequelize.close(); // Close the DB connection
});

let token = "";
let imageId = "";

describe('POST /api/user/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({
          userName: 'tarun',
          password: 'tarun',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('userName', 'tarun');
    });
  });

describe('POST /api/user/login', () => {
it('should register a new user', async () => {
    const res = await request(app)
    .post('/api/user/login')
    .send({
        userName: 'tarun',
        password: 'tarun',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'User logged in successfully');
    token = res.body.data; // Assuming the token is in the data field
    expect(token).toBeDefined(); 
});
});

describe('POST /api/dogimage/add', () => {
    it('should register a new user', async () => {
        const res = await request(app)
        .post('/api/dogimage/add')
        .set('Authorization', token)
        .attach('dogPic', path.resolve(__dirname, 'vim-chear-sheet.jpeg'))
    
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('success', true);
        imageId = res.body.data.id;
        expect(imageId).toBeDefined();
    });
});


describe('GET /api/dogimage/details', () => {
    it('should return a list of dogs', async () => {
      const res = await request(app).get('/api/dogimage/details').query({ id: imageId}).set('Authorization', token);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
    });
  });



describe('GET /api/dogimage/list', () => {
  it('should return a list of dogs', async () => {
    console.log("tokenksndlksf", token)
    const res = await request(app).get('/api/dogimage/list').set('Authorization', token);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
        success: true,
        message: 'Image found successfully',
        error: null,
        data: expect.any(Array)
    });
  });
});


