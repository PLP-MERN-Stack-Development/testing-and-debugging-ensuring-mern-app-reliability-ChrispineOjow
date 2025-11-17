const buildSlug = (input = '') =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `post-${Date.now()}`;

module.exports = { buildSlug };

