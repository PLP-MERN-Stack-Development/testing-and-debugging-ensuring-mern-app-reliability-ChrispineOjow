const jwt = require('jsonwebtoken');
const authMiddleware = require('../../src/middleware/authMiddleware');
const User = require('../../src/models/User');

jest.mock('../../src/models/User');
jest.mock('jsonwebtoken');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (headers = {}) => ({
  headers
});

describe('authMiddleware', () => {
  it('returns 401 when header missing', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('attaches user on success', async () => {
    const req = mockRequest({ authorization: 'Bearer token' });
    const res = mockResponse();
    const next = jest.fn();

    jwt.verify.mockReturnValue({ id: 'userId' });
    User.findById.mockResolvedValue({ _id: 'userId', username: 'Test' });

    await authMiddleware(req, res, next);

    expect(req.user).toEqual({ _id: 'userId', username: 'Test' });
    expect(next).toHaveBeenCalled();
  });
});

