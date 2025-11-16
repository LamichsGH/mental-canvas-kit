interface SectionDividerProps {
  variant?: 'subtle' | 'angle';
  flip?: boolean;
  topColor?: string;
  bottomColor?: string;
}

export const SectionDivider = ({ 
  variant = 'subtle', 
  flip = false,
  topColor = '#f5efea',
  bottomColor = '#ffffff'
}: SectionDividerProps) => {
  const getPath = () => {
    switch (variant) {
      case 'angle':
        return 'M0,20L1440,0L1440,0L0,0Z';
      case 'subtle':
      default:
        return 'M0,10L1440,0L1440,0L0,0Z';
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden"
      style={{ 
        transform: flip ? 'rotate(180deg)' : 'none',
        marginTop: '-1px',
        marginBottom: '-1px'
      }}
    >
      <svg
        viewBox="0 0 1440 20"
        preserveAspectRatio="none"
        className="w-full h-4 md:h-6"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={`gradient-${variant}-${flip}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: topColor, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: bottomColor, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d={getPath()}
          fill={`url(#gradient-${variant}-${flip})`}
        />
      </svg>
    </div>
  );
};
