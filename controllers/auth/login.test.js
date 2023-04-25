const request = require('supertest');
const app = require('../../app');
const { UserModel } = require('../../database/models');
const { checkHash } = require('../../services');

describe('Login Controller', () => {
  const testUser = {
    email: 'testuser@example.com',
    password: 'testpassword',
  };

  beforeAll(async () => {
    // Додати тестового користувача в базу даних
    const passwordHash = await checkHash(testUser.password);
    await UserModel.create({
      email: testUser.email,
      passwordHash,
    });
  });

  afterAll(async () => {
    // Видалити тестового користувача з бази даних
    await UserModel.deleteOne({ email: testUser.email });
  });

  it('should respond with 200 and a token when provided with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: testUser.email, password: testUser.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });


});
