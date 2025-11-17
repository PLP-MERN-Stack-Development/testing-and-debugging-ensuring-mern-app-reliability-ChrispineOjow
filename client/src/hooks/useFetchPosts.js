import { useCallback, useEffect, useState } from 'react';
import { getPosts } from '../services/apiClient';

const useFetchPosts = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(
    async (overrideFilters) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPosts(overrideFilters ?? filters);
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Unable to fetch posts');
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const refresh = useCallback(() => fetchPosts(), [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    filters,
    setFilters,
    refresh
  };
};

export default useFetchPosts;

