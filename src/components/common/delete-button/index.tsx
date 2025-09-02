import clsx from 'clsx';
import React from 'react'

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
}

const DeleteButton:React.FC<ButtonProps> = ({children, type="button", className, onClick, disabled = false}) => {
  return (
    <button 
      type={type} 
      disabled={disabled}
      className={clsx(
       "overflow-clip relative text-[15px] text-white px-4 rounded-lg py-2 bg-gradient-to-t from-red-800 to-red-600 hover:cursor-pointer text-center font-medium border border-red-900 shadow-custom-subtle before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-[color:#FF6347] before:rounded-t-lg before:z-10 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button> 
  )
}

export default DeleteButton