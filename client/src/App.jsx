import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { AuthProvider } from './context/AuthContext';
import useFetchPosts from './hooks/useFetchPosts';

const App = () => {
  const { posts, loading, refresh } = useFetchPosts();

  return (
    <AuthProvider>
      <ErrorBoundary>
        <div className="app-shell">
          <Navigation />
          <section>
            <LoginForm />
            <PostForm onPostSaved={refresh} />
            <PostList posts={posts} loading={loading} onRefresh={refresh} />
          </section>
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;

