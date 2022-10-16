import React from 'react';

type ButtonProps = JSX.IntrinsicElements['button'] & {
  children: React.ReactNode;
};

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`px-3 py-2 bg-violet-400 rounded-xl text-white ${className} disabled:opacity-40`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
