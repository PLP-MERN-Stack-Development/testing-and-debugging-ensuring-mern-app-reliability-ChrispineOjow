import React, { useState } from 'react';
import Button from './Button';
import { useAuth } from '../hooks/useAuth';
import { createPost } from '../services/apiClient';
import { validatePost } from '../utils/validators';

const INITIAL_STATE = { title: '', content: '', category: '' };

const PostForm = ({ onPostSaved }) => {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const { token } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validatePost(values);
    setErrors(validation.errors);
    if (!validation.isValid) return;

    try {
      setStatus('submitting');
      await createPost(values, token);
      setValues(INITIAL_STATE);
      setStatus('success');
      onPostSaved?.();
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="post-form">
      <h2>Create Post</h2>
      <label>
        Title
        <input name="title" value={values.title} onChange={handleChange} placeholder="Post title" />
      </label>
      {errors.title && <span role="alert">{errors.title}</span>}

      <label>
        Content
        <textarea name="content" value={values.content} onChange={handleChange} placeholder="Content" />
      </label>
      {errors.content && <span role="alert">{errors.content}</span>}

      <label>
        Category
        <input name="category" value={values.category} onChange={handleChange} placeholder="Category id" />
      </label>
      {errors.category && <span role="alert">{errors.category}</span>}

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Saving...' : 'Publish'}
      </Button>
    </form>
  );
};

export default PostForm;

