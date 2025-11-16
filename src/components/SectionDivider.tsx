interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'slope';
  flip?: boolean;
  topColor?: string;
  bottomColor?: string;
}

export const SectionDivider = ({ 
  variant = 'wave', 
  flip = false,
  topColor = '#f5efea',
  bottomColor = '#ffffff'
}: SectionDividerProps) => {
  const getPath = () => {
    switch (variant) {
      case 'wave':
        return 'M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z';
      case 'curve':
        return 'M0,64L1440,32L1440,0L0,0Z';
      case 'slope':
        return 'M0,96L1440,0L1440,0L0,0Z';
      default:
        return 'M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z';
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
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
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
