import clsx from 'clsx';
import React from 'react'

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
}

const PrimaryButton:React.FC<ButtonProps> = ({children, type="button", className, onClick, disabled = false}) => {
  return (
    <button 
      type={type} 
      disabled={disabled}
      className={clsx(
        "overflow-clip relative text-xs sm:text-sm md:text-base text-white px-4 rounded-lg py-2 bg-gradient-to-t from-twilight-deep to-twilight-teal hover:cursor-pointer text-center font-medium border border-twilight-navy shadow-custom-subtle before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-[color:#4F7084] before:rounded-t-lg before:z-10 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button> 
  )
}

export default PrimaryButton