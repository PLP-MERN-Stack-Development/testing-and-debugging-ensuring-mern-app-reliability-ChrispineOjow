export const isRequired = (value) => Boolean(value && value.trim());

export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => typeof password === 'string' && password.trim().length >= 8;

export const validatePost = (values) => {
  const errors = {};
  if (!isRequired(values.title)) {
    errors.title = 'Title is required';
  }
  if (!isRequired(values.content)) {
    errors.content = 'Content is required';
  }
  if (!isRequired(values.category)) {
    errors.category = 'Category is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

