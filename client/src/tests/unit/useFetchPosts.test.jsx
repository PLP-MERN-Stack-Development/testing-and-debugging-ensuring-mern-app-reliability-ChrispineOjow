import { renderHook, act, waitFor } from '@testing-library/react';
import useFetchPosts from '../../hooks/useFetchPosts';
import * as apiClient from '../../services/apiClient';

jest.mock('../../services/apiClient');

describe('useFetchPosts', () => {
  beforeEach(() => {
    apiClient.getPosts.mockResolvedValue([{ _id: '1', title: 'Test', createdAt: Date.now(), category: 'general' }]);
  });

  it('fetches posts on mount', async () => {
    const { result } = renderHook(() => useFetchPosts());

    await waitFor(() => expect(apiClient.getPosts).toHaveBeenCalled());
    expect(result.current.posts).toHaveLength(1);
  });

  it('allows manual refresh', async () => {
    const { result } = renderHook(() => useFetchPosts());

    await waitFor(() => expect(apiClient.getPosts).toHaveBeenCalled());

    await act(async () => {
      await result.current.refresh();
    });

    expect(apiClient.getPosts).toHaveBeenCalledTimes(2);
  });
});

