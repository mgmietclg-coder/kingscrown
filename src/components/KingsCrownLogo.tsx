import React from 'react';

interface KingsCrownLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'gold' | 'white' | 'dark';
}

export const KingsCrownLogo: React.FC<KingsCrownLogoProps> = ({
  className = 'w-8 h-8',
  variant = 'gold'
}) => {
  const goldColor = '#C5A059';
  const fillColor = variant === 'gold' ? goldColor : variant === 'white' ? '#F5F5F0' : '#0A0A0A';

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="King's Crown Logo"
    >
      {/* Outer Bracket / C-Frame */}
      <path
        d="M 68 20 
           L 155 20 
           L 155 38 
           L 78 38 
           C 54 38 40 52 40 76 
           L 40 124 
           C 40 148 54 162 78 162 
           L 82 162 
           L 82 180 
           L 68 180 
           C 36 180 20 160 20 128 
           L 20 72 
           C 20 40 36 20 68 20 Z"
        fill={fillColor}
      />

      {/* Top-Right Royal Crown (King's & Queen's Crown emblem) */}
      <path
        d="M 126 34 
           L 132 58 
           L 145 42 
           L 158 58 
           L 164 34 
           L 168 64 
           L 122 64 Z"
        fill={fillColor}
      />
      {/* Crown base bar */}
      <rect x="122" y="66" width="46" height="4" fill={fillColor} />

      {/* Stylized Geometric Lion Head Mane & Profile (Official Crest) */}
      {/* Mane Slats / Diagonal Stripes */}
      {/* Slat 1 - Top mane connecting to jaw */}
      <path
        d="M 70 20 
           L 96 20 
           L 136 68 
           L 116 68 
           L 88 36 
           L 70 36 Z"
        fill={fillColor}
      />

      {/* Slat 2 - Middle mane */}
      <path
        d="M 70 54 
           L 86 54 
           L 128 104 
           L 108 104 
           L 70 60 Z"
        fill={fillColor}
      />

      {/* Slat 3 - Lower mane */}
      <path
        d="M 70 88 
           L 86 88 
           L 114 122 
           L 94 122 
           L 70 94 Z"
        fill={fillColor}
      />

      {/* Slat 4 - Bottom mane */}
      <path
        d="M 70 122 
           L 86 122 
           L 100 138 
           L 82 138 
           L 70 126 Z"
        fill={fillColor}
      />

      {/* Lion Snout, Nose & Powerful Roaring Jaw Profile */}
      <path
        d="M 124 68 
           L 148 68 
           L 156 82 
           L 150 82 
           L 150 94 
           L 168 116 
           L 142 116 
           L 130 102 
           L 138 102 
           L 128 90 
           L 118 90 
           L 122 82 
           L 110 82 Z"
        fill={fillColor}
      />

      {/* Lower Jaw & Chin */}
      <path
        d="M 134 126 
           L 156 126 
           L 156 138 
           L 146 150 
           L 124 150 
           L 110 134 
           L 124 134 
           L 128 126 Z"
        fill={fillColor}
      />

      {/* Throat & Collar Line */}
      <path
        d="M 112 152 
           L 136 152 
           L 148 166 
           L 126 180 
           L 108 180 
           L 96 166 Z"
        fill={fillColor}
      />

      {/* Vertical Spine Bar */}
      <rect x="70" y="20" width="16" height="160" fill={fillColor} />
    </svg>
  );
};
