import '@testing-library/jest-dom';

// Polyfill/Mock IntersectionObserver for JSDOM in tests
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class MockIntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe(element) {
      if (typeof this.callback === 'function') {
        this.callback([{ isIntersecting: true, target: element }]);
      }
    }
    unobserve() {}
    disconnect() {}
  }
  window.IntersectionObserver = MockIntersectionObserver;
}

