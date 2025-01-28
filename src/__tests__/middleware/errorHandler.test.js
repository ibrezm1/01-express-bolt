const { errorHandler } = require('../../middleware/errorHandler');
const { ApiError } = require('../../utils/errors');

describe('ErrorHandler Middleware', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it('should handle ApiError correctly', () => {
    const apiError = new ApiError(400, 'Bad Request');
    errorHandler(apiError, mockRequest, mockResponse, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Bad Request'
    });
  });

  it('should handle unknown errors as 500 Internal Server Error', () => {
    const error = new Error('Unknown error');
    errorHandler(error, mockRequest, mockResponse, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Internal Server Error'
    });
  });
});