const axios = require('axios');
const userService = require('../../services/userService');
const { ApiError } = require('../../utils/errors');

jest.mock('axios');

describe('UserService', () => {
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
      const mockResponse = { data: { ...userData, id: '123' } };
      axios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue(mockResponse)
      });

      const result = await userService.createUser(userData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors', async () => {
      axios.create.mockReturnValue({
        post: jest.fn().mockRejectedValue({
          response: { status: 400, data: { message: 'Invalid data' } }
        })
      });

      await expect(userService.createUser(userData)).rejects.toThrow(ApiError);
    });
  });

  describe('updateUser', () => {
    const userId = '123';
    const updateData = {
      firstName: 'Updated',
      lastName: 'User'
    };

    it('should update a user successfully', async () => {
      const mockResponse = { data: { id: userId, ...updateData } };
      axios.create.mockReturnValue({
        put: jest.fn().mockResolvedValue(mockResponse)
      });

      const result = await userService.updateUser(userId, updateData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('searchUsers', () => {
    it('should search users with pagination', async () => {
      const mockUsers = {
        data: {
          users: [{ id: '1', name: 'Test User' }],
          total: 1,
          page: 1,
          limit: 10
        }
      };

      axios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockUsers)
      });

      const result = await userService.searchUsers(1, 10, 'test');
      expect(result).toEqual(mockUsers.data);
    });
  });
});