import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalRecords,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  className = '',
}) => {
  // If no records and no pages, don't render anything
  if (totalPages <= 1 && (totalRecords === undefined || totalRecords === 0)) {
    return null;
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    // Show first, last, current, and neighbours
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  const startRecord =
    totalRecords !== undefined
      ? totalRecords === 0
        ? 0
        : (currentPage - 1) * pageSize + 1
      : null;
  const endRecord =
    totalRecords !== undefined
      ? Math.min(currentPage * pageSize, totalRecords)
      : null;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-charcoal/70 ${className}`}
      aria-label="Pagination Navigation"
    >
      {/* Record summary & Page Size Selector */}
      <div className="flex flex-wrap items-center gap-3">
        {totalRecords !== undefined && (
          <span className="font-medium text-charcoal/80">
            Showing{' '}
            <span className="font-semibold text-burgundy-950">
              {totalRecords === 0 ? 0 : `${startRecord}–${endRecord}`}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-burgundy-950">
              {totalRecords}
            </span>{' '}
            {totalRecords === 1 ? 'record' : 'records'}
          </span>
        )}

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 pl-2 sm:border-l sm:border-sand-300">
            <span className="text-charcoal/60">Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-1 rounded-md border border-sand-300 bg-white text-xs font-semibold text-burgundy-950 focus:outline-none focus:ring-1 focus:ring-burgundy-600 transition-colors"
              aria-label="Records per page"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Page navigation controls */}
      {totalPages > 1 && (
        <nav
          className="inline-flex items-center gap-1 self-center sm:self-auto"
          aria-label="Pagination"
        >
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="inline-flex flex-row items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-sand-300 bg-white text-charcoal hover:bg-sand-100 hover:border-sand-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition-colors shrink-0 whitespace-nowrap"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Numbered page buttons */}
          <div className="flex items-center gap-1">
            {pages.map((p, idx) =>
              p === '...' ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-charcoal/40 font-semibold"
                >
                  …
                </span>
              ) : (
                <button
                  type="button"
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all inline-flex items-center justify-center ${
                    p === currentPage
                      ? 'bg-burgundy text-white shadow-xs font-bold'
                      : 'border border-sand-300 bg-white text-charcoal hover:bg-sand-100'
                  }`}
                  aria-current={p === currentPage ? 'page' : undefined}
                >
                  {p}
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="inline-flex flex-row items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-sand-300 bg-white text-charcoal hover:bg-sand-100 hover:border-sand-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition-colors shrink-0 whitespace-nowrap"
            aria-label="Next Page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </nav>
      )}
    </div>
  );
};

export default Pagination;
