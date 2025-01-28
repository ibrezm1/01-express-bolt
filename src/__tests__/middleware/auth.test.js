const { authenticateToken, requireRole } = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../../utils/errors');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
      user: null
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  describe('authenticateToken', () => {
    it('should authenticate valid token', () => {
      const user = { id: 1, username: 'test', role: 'admin' };
      jwt.verify.mockReturnValue(user);
      mockRequest.headers.authorization = 'Bearer valid.token';

      authenticateToken(mockRequest, mockResponse, nextFunction);

      expect(mockRequest.user).toEqual(user);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should throw error for missing token', () => {
      expect(() => {
        authenticateToken(mockRequest, mockResponse, nextFunction);
      }).toThrow(ApiError);
    });
  });

  describe('requireRole', () => {
    it('should allow access for correct role', () => {
      mockRequest.user = { role: 'admin' };
      const middleware = requireRole('admin');

      middleware(mockRequest, mockResponse, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should deny access for incorrect role', () => {
      mockRequest.user = { role: 'user' };
      const middleware = requireRole('admin');

      expect(() => {
        middleware(mockRequest, mockResponse, nextFunction);
      }).toThrow(ApiError);
    });
  });
});