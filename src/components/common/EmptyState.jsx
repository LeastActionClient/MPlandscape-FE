import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No Records Found',
  description = 'There are currently no items to display in this section.',
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`rounded-xl border border-sand bg-cream-light p-10 text-center max-w-md mx-auto ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-sand/30 text-bronze flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-bronze" />
      </div>
      <h3 className="text-lg font-bold text-brand-dark mb-1">{title}</h3>
      <p className="text-sm text-brand-muted mb-5 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
