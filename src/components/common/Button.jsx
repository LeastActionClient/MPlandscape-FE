import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex flex-row items-center justify-center font-medium rounded-lg transition-all duration-200 select-none focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99] whitespace-nowrap shrink-0';

  const sizeStyles = {
    sm: 'text-sm sm:text-xs px-3.5 py-2 gap-2',
    md: 'text-base sm:text-sm px-5 py-2.5 gap-2',
    lg: 'text-lg sm:text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-burgundy text-white hover:bg-burgundy-dark hover:shadow-md border border-burgundy hover:border-bronze',
    secondary:
      'bg-white text-charcoal border border-sand-300 hover:bg-sand-100 hover:border-sand-400',
    accent:
      'bg-bronze text-white hover:bg-bronze-dark hover:shadow-md border border-bronze',
    outline:
      'bg-transparent text-burgundy border-1.5 border-burgundy hover:bg-burgundy hover:text-white',
    sand:
      'bg-sand text-brand-dark hover:bg-sand-dark border border-sand-dark/20',
    ghost:
      'bg-transparent text-brand-dark hover:text-burgundy hover:bg-sand/30',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant] || ''} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span className="inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap shrink-0">{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
};

export default Button;
