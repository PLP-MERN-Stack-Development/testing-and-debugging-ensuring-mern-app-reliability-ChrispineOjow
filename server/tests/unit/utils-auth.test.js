const { generateToken } = require('../../src/utils/auth');

describe('auth utils', () => {
  it('throws when user id missing', () => {
    expect(() => generateToken({})).toThrow('User payload missing identifier');
  });

  it('creates a token for valid payload', () => {
    const token = generateToken({ _id: '507f1f77bcf86cd799439011', email: 'test@example.com' });
    expect(typeof token).toBe('string');
  });
});

