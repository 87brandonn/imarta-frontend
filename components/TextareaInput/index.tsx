/* eslint-disable react/require-default-props */
import React, { Ref, useCallback, useMemo, useState } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path
} from 'react-hook-form';
import cx from 'classnames';

type HookFormTextInput<T extends FieldValues> = {
  isHookForm: true;
  control: Control<T, any>;
  controlName: Path<T>;
};

type NormalTextInput = {
  isHookForm?: false;
  control?: never;
  controlName?: never;
};

type MaxCharType =
  | {
      hasMaxCharLabel?: true;
      maxChar: number;
    }
  | {
      hasMaxCharLabel?: false;
      maxChar?: never;
    };

type BBBTextAreaInputProps<T extends FieldValues> = (
  | HookFormTextInput<T>
  | NormalTextInput
) &
  JSX.IntrinsicElements['textarea'] &
  MaxCharType & {
    error?: string;
    label?: string | React.ReactNode;
    description?: string | React.ReactNode;
    labelClassname?: string;
    descriptionClassname?: string;
    containerClassname?: string;
    inputClassName?: string;
  };

const BBBTextAreaInput = <T extends FieldValues>(
  {
    isHookForm = false,
    controlName,
    control,
    error,
    label,
    description,
    containerClassname,
    labelClassname,
    descriptionClassname,
    inputClassName,
    hasMaxCharLabel = false,
    maxChar,
    ...inputProps
  }: BBBTextAreaInputProps<T>,
  ref: Ref<HTMLTextAreaElement>
) => {
  const { className, onChange, disabled, ...inputPropsExcluded } = inputProps;

  const [isFocus, setIsFocus] = useState(false);

  const getInputFixedClassName = cx('w-full', inputClassName);

  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  const memoizedUnControlledInput = useCallback(
    () => (
      <div className={`relative `} onFocus={handleFocus} onBlur={handleBlur}>
        <textarea
          className={`form-control grow ${getInputFixedClassName}`}
          maxLength={maxChar || undefined}
          {...inputPropsExcluded}
          onChange={onChange}
          ref={ref}
        />
        {hasMaxCharLabel && (
          <div className="z-10 text-sm opacity-30 absolute top-1/2 right-2 transform -translate-y-1/2">
            {(
              (
                inputPropsExcluded as React.DetailedHTMLProps<
                  React.InputHTMLAttributes<HTMLInputElement>,
                  HTMLInputElement
                >
              ).value as string
            )?.length || 0}
            /{maxChar}
          </div>
        )}
      </div>
    ),
    [
      getInputFixedClassName,
      hasMaxCharLabel,
      inputPropsExcluded,
      maxChar,
      onChange,
      ref
    ]
  );

  const memoizedControlledInput = useCallback(
    ({
      onChange,
      onBlur,
      value,
      ...rest
    }: ControllerRenderProps<T, Path<T>>) => (
      <div className={`relative `} onFocus={handleFocus} onBlur={handleBlur}>
        <textarea
          className={`px-3 py-1 rounded-lg border grow ${getInputFixedClassName}`}
          maxLength={maxChar || undefined}
          {...inputPropsExcluded}
          onChange={({ target: { value: targetValue } }) => {
            onChange(targetValue);
          }}
          value={value}
          {...rest}
          ref={ref}
        />
        {hasMaxCharLabel && (
          <div className="z-10 text-sm opacity-30 absolute top-1/2 right-2 transform -translate-y-1/2">
            {value.length}/{maxChar}
          </div>
        )}
      </div>
    ),
    [getInputFixedClassName, hasMaxCharLabel, inputPropsExcluded, maxChar, ref]
  );

  const input = useMemo(() => {
    if (isHookForm) {
      return (
        <Controller
          name={controlName as Path<T>}
          control={control}
          render={({ field }) => memoizedControlledInput(field)}
        />
      );
    }
    return memoizedUnControlledInput();
  }, [
    control,
    controlName,
    isHookForm,
    memoizedControlledInput,
    memoizedUnControlledInput
  ]);

  return (
    <div className={`mb-3 ${containerClassname}`}>
      {label && <div className={labelClassname}>{label}</div>}
      {input}
      {description && (
        <div className={`${descriptionClassname ? 'font-bold' : ''}`}>
          {description}
        </div>
      )}
      {!!error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default React.forwardRef(BBBTextAreaInput) as <T extends FieldValues>(
  p: BBBTextAreaInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => React.ReactElement;
