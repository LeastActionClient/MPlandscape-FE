import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorMessage = ({
  title = 'Unable to Load Content',
  message = 'An unexpected error occurred while processing your request.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`rounded-xl border border-burgundy/20 bg-burgundy/5 p-6 text-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-6 h-6 text-burgundy" />
      </div>
      <h3 className="text-lg font-bold text-burgundy mb-1">{title}</h3>
      <p className="text-sm text-brand-muted mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" icon={RefreshCw} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
