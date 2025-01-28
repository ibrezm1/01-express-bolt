const request = require('supertest');
const express = require('express');
const userController = require('../../controllers/userController');
const userService = require('../../services/userService');

jest.mock('../../services/userService');

const app = express();
app.use(express.json());
app.post('/api/users', userController.createUser);
app.put('/api/users/:userId', userController.updateUser);
app.post('/api/users/:userId/unlock', userController.unlockUser);
app.post('/api/users/:userId/deprovision', userController.deprovisionUser);
app.post('/api/users/:userId/password-unlock', userController.passwordUnlock);
app.get('/api/users', userController.searchUsers);

describe('UserController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    const userData = {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'user'
    };

    it('should create a user successfully', async () => {
      userService.createUser.mockResolvedValue(userData);

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toEqual(userData);
      expect(userService.createUser).toHaveBeenCalledWith(userData);
    });

    it('should handle errors during user creation', async () => {
      const error = new Error('Failed to create user');
      userService.createUser.mockRejectedValue(error);

      await request(app)
        .post('/api/users')
        .send(userData)
        .expect(500);
    });
  });

  describe('updateUser', () => {
    const userId = '123';
    const updateData = {
      firstName: 'Updated',
      lastName: 'User'
    };

    it('should update a user successfully', async () => {
      userService.updateUser.mockResolvedValue({ id: userId, ...updateData });

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({ id: userId, ...updateData });
      expect(userService.updateUser).toHaveBeenCalledWith(userId, updateData);
    });
  });

  describe('unlockUser', () => {
    const userId = '123';

    it('should unlock a user successfully', async () => {
      userService.unlockUser.mockResolvedValue({ id: userId, status: 'unlocked' });

      const response = await request(app)
        .post(`/api/users/${userId}/unlock`)
        .expect(200);

      expect(response.body).toEqual({ id: userId, status: 'unlocked' });
      expect(userService.unlockUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('searchUsers', () => {
    it('should search users with pagination', async () => {
      const mockUsers = {
        users: [{ id: '1', name: 'Test User' }],
        total: 1,
        page: 1,
        limit: 10
      };

      userService.searchUsers.mockResolvedValue(mockUsers);

      const response = await request(app)
        .get('/api/users?page=1&limit=10&search=test')
        .expect(200);

      expect(response.body).toEqual(mockUsers);
      expect(userService.searchUsers).toHaveBeenCalledWith(1, 10, 'test');
    });
  });
});