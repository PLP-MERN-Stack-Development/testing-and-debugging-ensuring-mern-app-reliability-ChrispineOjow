import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { loginUser } from '../services/apiClient';

export const AuthContext = createContext(null);

export const initialAuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading', error: null };
    case 'login-success':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'logout':
      return { ...initialAuthState, status: 'idle' };
    case 'error':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = useCallback(async (credentials) => {
    dispatch({ type: 'loading' });
    try {
      const data = await loginUser(credentials);
      dispatch({ type: 'login-success', payload: data });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message || 'Unable to login' });
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'logout' });
  }, []);

  const value = useMemo(
    () => ({
      user: state.user,
      token: state.token,
      status: state.status,
      error: state.error,
      login,
      logout
    }),
    [state, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

