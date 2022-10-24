import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Button from '../Button';

type CmsTextInputType = {
  value: string;
};

const schema = yup
  .object({
    value: yup.string()
  })
  .required();

const CMSTextInput = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input'] & {
    error?: string;
    label?: string;
    onSave?: (val: string) => void;
  }
>(({ className, error, label, onSave, value, ...props }, ref) => {
  const { setValue, handleSubmit, register } = useForm<CmsTextInputType>({
    resolver: yupResolver(schema),
    defaultValues: {
      value: ''
    }
  });

  useEffect(() => {
    setValue('value', value as string);
  }, [setValue, value]);

  const onSubmit = (data: CmsTextInputType) => {
    onSave?.(data.value);
  };

  return (
    <>
      <div>{label}</div>
      <input
        className={`rounded-xl px-3 w-full py-2 border ${className}`}
        placeholder="Enter something"
        type="text"
        {...register('value')}
      />
      <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3">
        Save
      </Button>
    </>
  );
});

CMSTextInput.displayName = 'CMSTextInput';

export default CMSTextInput;
