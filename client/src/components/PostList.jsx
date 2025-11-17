import React from 'react';
import Button from './Button';
import { formatDate, truncateText } from '../utils/format';

const PostList = ({ posts = [], loading, onRefresh }) => {
  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (!posts.length) {
    return (
      <div>
        <p>No posts yet.</p>
        <Button onClick={onRefresh}>Refresh</Button>
      </div>
    );
  }

  return (
    <ul aria-label="post-list">
      {posts.map((post) => (
        <li key={post._id}>
          <h3>{post.title}</h3>
          <p>{truncateText(post.content, 120)}</p>
          <small>
            {formatDate(post.createdAt)} • {post.category}
          </small>
        </li>
      ))}
    </ul>
  );
};

export default PostList;

