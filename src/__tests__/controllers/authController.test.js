const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authController = require('../../controllers/authController');

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

const app = express();
app.use(express.json());
app.post('/api/auth/login', authController.login);

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const loginData = {
      username: 'admin',
      password: 'password123'
    };

    it('should login successfully and return a token', async () => {
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mock.jwt.token');

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(jwt.sign).toHaveBeenCalled();
    });

    it('should return 401 for invalid credentials', async () => {
      bcrypt.compare.mockResolvedValue(false);

      await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);
    });
  });
});