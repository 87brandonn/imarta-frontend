import React from 'react';

const TextInput = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input'] & {
    error?: string;
    label?: string;
  }
>(({ className, error, label, ...props }, ref) => {
  return (
    <div>
      <div>{label}</div>
      <input
        ref={ref}
        className={`rounded-xl px-3 w-full py-2 border ${className}`}
        placeholder="Enter something"
        type="text"
        {...props}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
