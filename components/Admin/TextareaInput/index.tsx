import React from 'react';

const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  JSX.IntrinsicElements['textarea'] & {
    label?: string;
    error?: string;
  }
>(({ className, label, error, ...props }, ref) => {
  return (
    <div>
      {label}
      <textarea
        className={`rounded-xl block mb-2 px-3 py-2 w-full h-36 border ${className}`}
        placeholder="Enter something"
        ref={ref}
        {...props}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
});

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
