import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-2xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div className="flex min-h-full items-center justify-center p-2.5 sm:p-4 text-center">
        <div
          className={`relative transform overflow-hidden rounded-2xl bg-cream-light text-left shadow-2xl transition-all my-2 sm:my-8 w-full ${maxWidth} border border-sand flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-4rem)]`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sand px-4 sm:px-6 py-3 sm:py-4 bg-cream shrink-0">
            <h3 className="text-base sm:text-lg font-bold text-burgundy font-sans truncate pr-2">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-brand-muted hover:bg-sand/30 hover:text-brand-dark transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content (Smoothly Scrollable on Mobile) */}
          <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
