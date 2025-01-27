const axios = require('axios');
const logger = require('../utils/logger');
const { ApiError } = require('../utils/errors');

class UserService {
  constructor() {
    this.oauth2Client = axios.create({
      baseURL: process.env.OAUTH2_BASE_URL,
      headers: {
        'Authorization': `Bearer ${process.env.OAUTH2_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async createUser(userData) {
    try {
      const response = await this.oauth2Client.post('/users', userData);
      return response.data;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw new ApiError(error.response?.status || 500, 'Failed to create user');
    }
  }

  async updateUser(userId, userData) {
    try {
      const response = await this.oauth2Client.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      logger.error('Error updating user:', error);
      throw new ApiError(error.response?.status || 500, 'Failed to update user');
    }
  }

  async unlockUser(userId) {
    try {
      const response = await this.oauth2Client.post(`/users/${userId}/unlock`);
      return response.data;
    } catch (error) {
      logger.error('Error unlocking user:', error);
      throw new ApiError(error.response?.status || 500, 'Failed to unlock user');
    }
  }

  async deprovisionUser(userId) {
    try {
      const response = await this.oauth2Client.post(`/users/${userId}/deprovision`);
      return response.data;
    } catch (error) {
      logger.error('Error deprovisioning user:', error);
      throw new ApiError(error.response?.status || 500, 'Failed to deprovision user');
    }
  }

  async passwordUnlock(userId) {
    try {
      const response = await this.oauth2Client.post(`/users/${userId}/password-unlock`);
      return response.data;
    } catch (error) {
      logger.error('Error unlocking password:', error);
      throw new ApiError(error.response?.status || 500, 'Failed to unlock password');
    }
  }

  async searchUsers(page, limit, search) {
    try {
      const response = await this.oauth2Client.get('/users', {
        params: {
          page,
          limit,
          search
        }
      });
      return response.data;
    } catch (error) {
      logger.error('Error searching users:', error);
      throw new ApiError(error.response?.status || 500, 'Failed to search users');
    }
  }
}

module.exports = new UserService();