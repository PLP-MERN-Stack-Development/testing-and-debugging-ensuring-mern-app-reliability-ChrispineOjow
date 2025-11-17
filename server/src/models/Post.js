const mongoose = require('mongoose');
const { buildSlug } = require('../utils/slug');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

postSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = buildSlug(this.title);
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);

