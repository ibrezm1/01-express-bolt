const { validateRequest } = require('../../middleware/validateRequest');
const { validationResult } = require('express-validator');

jest.mock('express-validator', () => ({
  validationResult: jest.fn()
}));

describe('ValidateRequest Middleware', () => {
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

  it('should call next() when validation passes', () => {
    validationResult.mockReturnValue({
      isEmpty: () => true
    });

    validateRequest(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should return 400 with errors when validation fails', () => {
    const mockErrors = {
      array: () => [{ msg: 'Invalid email' }]
    };
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: mockErrors.array
    });

    validateRequest(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: [{ msg: 'Invalid email' }]
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});