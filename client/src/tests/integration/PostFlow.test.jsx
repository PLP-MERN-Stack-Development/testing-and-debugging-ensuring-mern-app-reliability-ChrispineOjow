import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import * as apiClient from '../../services/apiClient';

jest.mock('../../services/apiClient');

describe('Post creation workflow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    apiClient.getPosts.mockResolvedValue([
      {
        _id: 'seed',
        title: 'Seed Post',
        content: 'Lorem ipsum',
        category: 'general',
        createdAt: new Date().toISOString()
      }
    ]);
    apiClient.loginUser.mockResolvedValue({
      user: { username: 'testuser', email: 'test@example.com' },
      token: 'token-123'
    });
    apiClient.createPost.mockResolvedValue({
      _id: 'new',
      title: 'New Post',
      content: 'Content',
      category: 'general'
    });
  });

  it('allows an authenticated user to create a post', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/seed post/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(apiClient.loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'New content' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'general' } });
    fireEvent.click(screen.getByRole('button', { name: /publish/i }));

    await waitFor(() => {
      expect(apiClient.createPost).toHaveBeenCalledWith(
        {
          title: 'New Post',
          content: 'New content',
          category: 'general'
        },
        'token-123'
      );
    });

    expect(apiClient.getPosts).toHaveBeenCalledTimes(2);
  });
});

