import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  className?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  labelClassName,
  className,
  id,
  required,
  value,
  onChange,
  ...rest
}) => {
  const inputId = id || rest.name || 'input';

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            "text-sm block pb-[3px] text-primary font-medium",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          "border border-icy-mist w-full outline-none shadow-custom-subtle rounded-lg py-2 px-3 ",
          className
        )}
        required={required}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default Input;
