import React from 'react';

interface RedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * 全透明按鈕 (Transparent Button)
 * 視覺上完全隱藏，僅提供點擊感應區域。
 * 因為按鈕圖案已內建於背景圖中。
 */
export const RedButton: React.FC<RedButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        bg-transparent border-none text-transparent
        focus:outline-none
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
