import { validateEmail, validatePassword, validatePost, isRequired } from '../../utils/validators';

describe('validators utilities', () => {
  it('validates email format', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  it('validates password length', () => {
    expect(validatePassword('12345678')).toBe(true);
    expect(validatePassword('short')).toBe(false);
  });

  it('checks required values', () => {
    expect(isRequired('hello')).toBe(true);
    expect(isRequired('   ')).toBe(false);
  });

  it('validates post payloads', () => {
    const valid = validatePost({ title: 'A', content: 'B', category: 'cat' });
    expect(valid.isValid).toBe(true);

    const invalid = validatePost({ title: '', content: '', category: '' });
    expect(invalid.isValid).toBe(false);
    expect(Object.keys(invalid.errors)).toHaveLength(3);
  });
});

