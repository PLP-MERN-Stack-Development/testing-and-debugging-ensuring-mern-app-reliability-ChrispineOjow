const errorHandler = require('../../src/middleware/errorHandler');

describe('errorHandler', () => {
  it('returns error response', () => {
    const err = new Error('Boom');
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    errorHandler(err, req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Boom' });
  });
});

