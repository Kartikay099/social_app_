import React from 'react';

const Card = ({
  children,
  className = '',
  onClick,
  hover = true,
  glass = false,
  glow = false,
  gradient = false,
}) => {
  const baseStyle = glass
    ? 'bg-white/10 backdrop-blur-md border border-white/10'
    : 'bg-white border border-neutral-200 dark:border-neutral-800';

  const hoverStyle = hover
    ? 'hover:scale-[1.025] hover:shadow-2xl'
    : '';

  const glowStyle = glow
    ? 'shadow-[0_0_20px_rgba(252,211,77,0.5)]'
    : '';

  const gradientBorder = gradient
    ? 'p-[1px] bg-gradient-to-tr from-pink-500 via-amber-400 to-yellow-300'
    : '';

  return (
    <div
      onClick={onClick}
      className={`transition-all duration-300 ease-in-out rounded-2xl
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${gradient ? '' : baseStyle}
        ${hoverStyle} ${glowStyle} ${className}`}
    >
      {gradient ? (
        <div className={`rounded-[inherit] ${baseStyle} p-4`}>
          {children}
        </div>
      ) : (
        <div className="p-4">{children}</div>
      )}
    </div>
  );
};

export default Card;
