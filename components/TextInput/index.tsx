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

const getFormattedUrl = (oldUrl: string) => {
  const urlRegx = new RegExp(/:\/?\/?/);
  const subScheme = oldUrl.match(urlRegx);
  const splittedURL = oldUrl.split(urlRegx);
  let baseScheme = `https`;
  const isProtocolDefined = splittedURL.length > 1;
  if (isProtocolDefined) {
    [baseScheme] = splittedURL;
  }
  return `${baseScheme}${subScheme || '://'}${
    isProtocolDefined ? splittedURL[1] : splittedURL[0]
  }`;
};

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

type FixedInputType =
  | {
      isFixed: true;
      fixedLabel: string | React.ReactNode;
    }
  | {
      isFixed?: false;
      fixedLabel?: never;
    };

type FixedSuffixInputType =
  | {
      isFixedSuffix: true;
      fixedSuffixLabel: string | React.ReactNode;
    }
  | {
      isFixedSuffix?: false;
      fixedSuffixLabel?: never;
    };

type BBBTextInputProps<T extends FieldValues> = (
  | HookFormTextInput<T>
  | NormalTextInput
) &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
  MaxCharType &
  FixedInputType &
  FixedSuffixInputType & {
    error?: string;
    label?: string | React.ReactNode;
    description?: string | React.ReactNode;
    labelClassname?: string;
    descriptionClassname?: string;
    containerClassname?: string;
    isUrl?: boolean;
    inputClassName?: string;
  };

const BBBTextInput = <T extends FieldValues>(
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
    isUrl = false,
    isFixed,
    isFixedSuffix,
    fixedSuffixLabel,
    fixedLabel,
    ...inputProps
  }: BBBTextInputProps<T>,
  ref: Ref<HTMLInputElement>
) => {
  const { className, onChange, onBlur, disabled, ...inputPropsExcluded } =
    inputProps;

  const [isFocus, setIsFocus] = useState(false);

  const getFixedInputWrapperClassName = cx(
    isFixed &&
      'flex items-center border border-gray-200 bg-white py-1 px-2 rounded',
    isFocus && 'border-[#FD823E]',
    disabled && 'opacity-20 pointer-events-none',
    className
  );

  const getInputFixedClassName = cx(
    isFixed ? '!p-0 !border-none' : '',
    inputClassName
  );

  const renderFixedLabel = useMemo(
    () =>
      typeof fixedLabel === 'string' ? (
        <span className="text-gray-400 whitespace-nowrap">{fixedLabel}</span>
      ) : (
        fixedLabel
      ),
    [fixedLabel]
  );

  const renderFixedSuffixLabel = useMemo(
    () =>
      typeof fixedSuffixLabel === 'string' ? (
        <span className="text-gray-400 whitespace-nowrap">
          {fixedSuffixLabel}
        </span>
      ) : (
        fixedSuffixLabel
      ),
    [fixedSuffixLabel]
  );

  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  const memoizedUnControlledInput = useCallback(
    () => (
      <div
        className={`relative ${getFixedInputWrapperClassName}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {isFixed && renderFixedLabel}
        <input
          className={`form-control grow ${getInputFixedClassName}`}
          maxLength={maxChar || undefined}
          {...inputPropsExcluded}
          onChange={onChange}
          onBlur={prop => {
            const {
              target: { value: targetValue, ...restTarget },
              ...restProp
            } = prop;
            if (isUrl) {
              const formattedUrl = getFormattedUrl(targetValue);
              onChange?.({
                ...restProp,
                target: {
                  ...restTarget,
                  value: formattedUrl
                }
              });
            }
            onBlur?.(prop);
          }}
          ref={ref}
        />
        {isFixedSuffix && renderFixedSuffixLabel}
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
      getFixedInputWrapperClassName,
      getInputFixedClassName,
      hasMaxCharLabel,
      inputPropsExcluded,
      isFixed,
      isFixedSuffix,
      isUrl,
      maxChar,
      onBlur,
      onChange,
      ref,
      renderFixedLabel,
      renderFixedSuffixLabel
    ]
  );

  const memoizedControlledInput = useCallback(
    ({
      onChange,
      onBlur,
      value,
      ...rest
    }: ControllerRenderProps<T, Path<T>>) => (
      <div
        className={`relative ${getFixedInputWrapperClassName}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {isFixed && renderFixedLabel}
        <input
          className={`px-3 py-1 rounded-lg border grow ${getInputFixedClassName}`}
          maxLength={maxChar || undefined}
          {...inputPropsExcluded}
          onChange={({ target: { value: targetValue } }) => {
            onChange(targetValue);
          }}
          onBlur={({ target: { value: targetValue } }) => {
            if (isUrl) {
              const formattedUrl = getFormattedUrl(targetValue);
              onChange(formattedUrl);
            }
            onBlur();
          }}
          value={value}
          {...rest}
          ref={ref}
        />
        {isFixedSuffix && renderFixedSuffixLabel}
        {hasMaxCharLabel && (
          <div className="z-10 text-sm opacity-30 absolute top-1/2 right-2 transform -translate-y-1/2">
            {value.length}/{maxChar}
          </div>
        )}
      </div>
    ),
    [
      getFixedInputWrapperClassName,
      getInputFixedClassName,
      hasMaxCharLabel,
      inputPropsExcluded,
      isFixed,
      isFixedSuffix,
      isUrl,
      maxChar,
      ref,
      renderFixedLabel,
      renderFixedSuffixLabel
    ]
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

export default React.forwardRef(BBBTextInput) as <T extends FieldValues>(
  p: BBBTextInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => React.ReactElement;
