const logger = require('../../src/utils/logger');

describe('logger', () => {
  it('throws on unsupported level', () => {
    expect(() => logger.log('unknown', 'message')).toThrow('Unsupported log level');
  });

  it('logs info without throwing', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('hello world');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

