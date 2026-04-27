import React from 'react';

export interface SplitTextProps {
  text: string;
  className?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({ text, className }) => {
  return <span className={className}>{text}</span>;
};
