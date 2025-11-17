import React from 'react';
import clsx from 'clsx';

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
  ghost: 'btn-ghost'
};

const SIZES = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg'
};

const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={clsx(
        'btn',
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        disabled && 'btn-disabled',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

