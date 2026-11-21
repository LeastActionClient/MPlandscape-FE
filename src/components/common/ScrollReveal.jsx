import React, { useState, useEffect, useRef } from 'react';

export const ScrollReveal = ({
  children,
  animation = 'fade-up', // 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade'
  delay = 0,
  duration = 700,
  className = '',
  as: Component = 'div',
  threshold = 0.1,
  triggerOnce = true,
  style = {},
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Immediate fallback for testing environments (like JSDOM) or unsupported browsers
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Check if element is already within viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      if (triggerOnce) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, triggerOnce]);

  const getAnimationClasses = () => {
    if (isVisible) {
      switch (animation) {
        case 'fade-up':
        case 'fade-down':
          return 'opacity-100 translate-y-0';
        case 'fade-left':
        case 'fade-right':
          return 'opacity-100 translate-x-0';
        case 'zoom-in':
          return 'opacity-100 scale-100';
        case 'fade':
        default:
          return 'opacity-100';
      }
    } else {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-10 pointer-events-none';
        case 'fade-down':
          return 'opacity-0 -translate-y-8 pointer-events-none';
        case 'fade-left':
          return 'opacity-0 translate-x-10 pointer-events-none';
        case 'fade-right':
          return 'opacity-0 -translate-x-10 pointer-events-none';
        case 'zoom-in':
          return 'opacity-0 scale-95 pointer-events-none';
        case 'fade':
        default:
          return 'opacity-0 pointer-events-none';
      }
    }
  };

  return (
    <Component
      ref={ref}
      className={`transition-all ease-out ${getAnimationClasses()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
