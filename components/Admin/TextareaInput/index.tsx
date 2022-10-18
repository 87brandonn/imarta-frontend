import React, { useEffect, useState } from 'react';
import Button from '../Button';

function TextAreaInput({
  value,
  onValueChange,
  containerClassName,
  className,
  onChange,
  ...props
}: JSX.IntrinsicElements['textarea'] & {
  onValueChange: (val: string) => void;
  containerClassName?: string;
}) {
  const [localValue, setLocalValue] = useState<string>('');

  useEffect(() => {
    setLocalValue((value as string) || '');
  }, [value]);

  return (
    <div className={containerClassName}>
      <textarea
        className={`rounded-xl block mb-2 px-3 py-2 w-full h-36 border ${className}`}
        placeholder="Enter something"
        value={localValue}
        onChange={e => {
          setLocalValue(e.target.value);
          onChange?.(e);
        }}
        {...props}
      />
      <Button
        onClick={() => onValueChange(localValue)}
        disabled={localValue === (value || '')}
      >
        Save
      </Button>
    </div>
  );
}

export default TextAreaInput;
