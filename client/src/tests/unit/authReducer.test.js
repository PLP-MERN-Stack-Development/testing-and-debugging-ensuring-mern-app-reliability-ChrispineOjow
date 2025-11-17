import { authReducer, initialAuthState } from '../../context/AuthContext';

describe('authReducer', () => {
  it('handles loading state', () => {
    const next = authReducer(initialAuthState, { type: 'loading' });
    expect(next.status).toBe('loading');
  });

  it('stores user on login success', () => {
    const payload = { user: { username: 'test' }, token: 'abc' };
    const next = authReducer(initialAuthState, { type: 'login-success', payload });
    expect(next.user).toEqual(payload.user);
    expect(next.token).toBe('abc');
    expect(next.status).toBe('authenticated');
  });

  it('resets state on logout', () => {
    const state = { ...initialAuthState, user: { username: 'demo' }, token: 'token', status: 'authenticated' };
    const next = authReducer(state, { type: 'logout' });
    expect(next).toEqual({ ...initialAuthState, status: 'idle' });
  });

  it('stores error messages', () => {
    const next = authReducer(initialAuthState, { type: 'error', payload: 'Oops' });
    expect(next.error).toBe('Oops');
    expect(next.status).toBe('error');
  });
});

