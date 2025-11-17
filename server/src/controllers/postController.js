const mongoose = require('mongoose');
const Post = require('../models/Post');
const { buildSlug } = require('../utils/slug');

const validatePostPayload = ({ title, content, category }) => {
  if (!title || !content || !category) {
    const error = new Error('Title, content and category are required');
    error.statusCode = 400;
    throw error;
  }
};

const createPost = async (req, res, next) => {
  try {
    validatePostPayload(req.body);
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.user._id,
      slug: buildSlug(req.body.title)
    });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const query = {};
  if (category) {
    query.category = category;
  }

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  res.json(posts);
};

const getPostById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
};

const ensureAuthor = (post, userId) => {
  if (post.author.toString() !== userId.toString()) {
    const error = new Error('Forbidden');
    error.statusCode = 403;
    throw error;
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    ensureAuthor(post, req.user._id);

    if (req.body.title) {
      post.title = req.body.title;
      post.slug = buildSlug(req.body.title);
    }
    if (req.body.content) {
      post.content = req.body.content;
    }
    if (req.body.category) {
      post.category = req.body.category;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    ensureAuthor(post, req.user._id);
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
};

