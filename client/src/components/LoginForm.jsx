import React, { useState } from 'react';
import Button from './Button';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validators';

const LoginForm = () => {
  const { login, status } = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!validateEmail(values.email)) {
      nextErrors.email = 'Invalid email';
    }
    if (!validatePassword(values.password)) {
      nextErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await login(values);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="login-form">
      <h2>Authentication</h2>
      <label>
        Email
        <input name="email" type="email" value={values.email} onChange={handleChange} />
      </label>
      {errors.email && <span role="alert">{errors.email}</span>}

      <label>
        Password
        <input name="password" type="password" value={values.password} onChange={handleChange} />
      </label>
      {errors.password && <span role="alert">{errors.password}</span>}

      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
};

export default LoginForm;

