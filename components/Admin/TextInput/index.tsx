import React, { useEffect, useState } from 'react';
import Button from '../Button';

function TextInput({
  value,
  onValueChange,
  onChange,
  containerClassName,
  ...props
}: JSX.IntrinsicElements['input'] & {
  onValueChange: (val: JSX.IntrinsicElements['input']['value']) => void;
  containerClassName?: string;
}) {
  const [localValue, setLocalValue] =
    useState<JSX.IntrinsicElements['input']['value']>('');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  return (
    <div className={`flex items-center gap-3 ${containerClassName}`}>
      <input
        className="rounded-xl px-3 w-full py-2 border"
        placeholder="Enter something"
        value={localValue}
        type="text"
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

export default TextInput;
