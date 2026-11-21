import React from 'react';

/**
 * Botanical & Architectural Side Space Decorations
 *
 * Provides subtle, low-opacity vector line-art positioned in outer margins (empty side areas).
 * Responsively hidden on mobile/tablet (hidden xl:block) so they NEVER collide with content,
 * text, buttons, or cards.
 */

// 1. Botanical Branch Line Art (Left Side)
export const BotanicalBranchLeft = ({ className = '' }) => (
  <div
    className={`hidden xl:block pointer-events-none select-none absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-0 opacity-15 hover:opacity-25 transition-opacity duration-700 ${className}`}
    aria-hidden="true"
  >
    <svg
      width="140"
      height="380"
      viewBox="0 0 140 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-bronze stroke-current"
    >
      {/* Central undulating stem */}
      <path
        d="M20 10 C35 70, 15 130, 45 190 C75 250, 40 310, 60 370"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* Delicate leaf fronds radiating out */}
      <path
        d="M22 60 C48 45, 78 50, 92 72 C70 82, 40 76, 22 60 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M23 110 C5 95, -15 105, -5 125 C12 125, 20 118, 23 110 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M32 150 C62 135, 92 142, 108 162 C85 174, 52 168, 32 150 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M48 210 C25 198, 5 208, 12 230 C30 230, 42 220, 48 210 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M52 260 C80 248, 110 255, 124 276 C100 288, 70 280, 52 260 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M50 315 C28 305, 10 315, 18 335 C35 334, 46 325, 50 315 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      {/* Subtle terminal bud accent */}
      <circle cx="20" cy="10" r="2" fill="currentColor" />
    </svg>
  </div>
);

// 2. Botanical Branch Line Art (Right Side)
export const BotanicalBranchRight = ({ className = '' }) => (
  <div
    className={`hidden xl:block pointer-events-none select-none absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-0 opacity-15 hover:opacity-25 transition-opacity duration-700 ${className}`}
    aria-hidden="true"
  >
    <svg
      width="140"
      height="380"
      viewBox="0 0 140 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-bronze stroke-current"
    >
      <path
        d="M120 10 C105 70, 125 130, 95 190 C65 250, 100 310, 80 370"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M118 60 C92 45, 62 50, 48 72 C70 82, 100 76, 118 60 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M117 110 C135 95, 155 105, 145 125 C128 125, 120 118, 117 110 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M108 150 C78 135, 48 142, 32 162 C55 174, 88 168, 108 150 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M92 210 C115 198, 135 208, 128 230 C110 230, 98 220, 92 210 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M88 260 C60 248, 30 255, 16 276 C40 288, 70 280, 88 260 Z"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="10" r="2" fill="currentColor" />
    </svg>
  </div>
);

// 3. Landscape Architecture Topographical Elevation Curves (Left or Right)
export const TopographicalContour = ({ position = 'left', className = '' }) => {
  const isLeft = position === 'left';
  return (
    <div
      className={`hidden 2xl:block pointer-events-none select-none absolute ${
        isLeft ? '-left-6 top-12' : '-right-6 bottom-12'
      } z-0 opacity-12 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="220"
        height="320"
        viewBox="0 0 220 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-bronze stroke-current"
      >
        <path
          d={
            isLeft
              ? 'M-20 40 C60 60, 90 120, 40 180 C-10 240, 100 280, 130 340'
              : 'M240 40 C160 60, 130 120, 180 180 C230 240, 120 280, 90 340'
          }
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <path
          d={
            isLeft
              ? 'M-20 80 C80 100, 120 150, 70 210 C20 270, 130 300, 170 360'
              : 'M240 80 C140 100, 100 150, 150 210 C200 270, 90 300, 50 360'
          }
          strokeWidth="0.8"
        />
        <path
          d={
            isLeft
              ? 'M-20 120 C100 140, 150 180, 100 240 C50 300, 160 320, 200 380'
              : 'M240 120 C120 140, 70 180, 120 240 C170 300, 60 320, 20 380'
          }
          strokeWidth="0.6"
          strokeDasharray="6 3"
        />
      </svg>
    </div>
  );
};

// 4. Subtle Architectural Blueprint Crosshairs and Measurement Marks
export const ArchitecturalGridMarks = ({ position = 'left', className = '' }) => {
  const isLeft = position === 'left';
  return (
    <div
      className={`hidden 2xl:flex flex-col gap-12 pointer-events-none select-none absolute ${
        isLeft ? 'left-6 top-24' : 'right-6 top-24'
      } z-0 opacity-20 text-bronze ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono tracking-widest text-bronze font-semibold">
          {isLeft ? '+ 01' : '02 +'}
        </span>
        <div className="w-4 h-px bg-bronze/50" />
      </div>
      <div className="w-2.5 h-2.5 border-t border-l border-bronze/60" />
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono tracking-widest text-bronze font-semibold">
          {isLeft ? '+ AX' : 'AY +'}
        </span>
        <div className="w-4 h-px bg-bronze/50" />
      </div>
      <div className="w-2.5 h-2.5 border-b border-l border-bronze/60" />
    </div>
  );
};

export default {
  BotanicalBranchLeft,
  BotanicalBranchRight,
  TopographicalContour,
  ArchitecturalGridMarks,
};
