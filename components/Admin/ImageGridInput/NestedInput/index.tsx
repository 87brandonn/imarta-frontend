import React from 'react';
import { X } from 'react-feather';
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFieldArray
} from 'react-hook-form';
import { ImageGridFormType } from '..';
import ImageInput from '../../ImageInput';

type NestedInputProps = {
  index: number;
  control: Control<ImageGridFormType>;
  errors?:
    | Merge<
        FieldError,
        (
          | Merge<
              FieldError,
              FieldErrorsImpl<{
                image: {
                  url: string;
                  type: NonNullable<'image' | 'video' | 'embed' | undefined>;
                };
              }>
            >
          | undefined
        )[]
      >
    | undefined;
};

function NestedInput({ index, control, errors }: NestedInputProps) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `imageGrid.${index}.nestedGrids`
  });

  return (
    <>
      <div className="mt-4 mb-3">Associated image</div>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field, nestedIdx) => (
          <div key={field.id}>
            <Controller
              control={control}
              name={`imageGrid.${index}.nestedGrids.${nestedIdx}.image`}
              render={({ field }) => (
                <ImageInput
                  data={{ imgUrl: field.value.url, type: field.value.type }}
                  onChange={val =>
                    field.onChange({
                      url: val?.imgUrl,
                      type: val?.type
                    })
                  }
                  imageClassName="w-24 h-24 rounded-xl"
                  withoutLink
                />
              )}
            />
            <div className="text-red-300 text-sm">
              {errors?.[nestedIdx]?.image?.url?.message}
            </div>
            <div
              className="mt-1 text-red-800 inline-block cursor-pointer hover:bg-red-400 px-3 py-1 rounded-xl"
              onClick={() => remove(nestedIdx)}
            >
              Remove
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() =>
          append({
            image: {
              url: undefined,
              type: undefined
            }
          })
        }
        className="cursor-pointer hover:bg-gray-100 inline-block px-3 py-1 rounded-xl"
      >
        Add
      </div>
    </>
  );
}

export default NestedInput;
