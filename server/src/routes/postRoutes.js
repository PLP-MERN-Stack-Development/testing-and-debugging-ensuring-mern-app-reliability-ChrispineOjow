const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();

router.route('/').get(getPosts).post(authMiddleware, createPost);

router
  .route('/:id')
  .get(getPostById)
  .put(authMiddleware, updatePost)
  .delete(authMiddleware, deletePost);

module.exports = router;

