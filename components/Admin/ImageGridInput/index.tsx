import React from 'react';
import { X } from 'react-feather';
import Button from '../Button';
import ImageInput from '../ImageInput';
import TextAreaInput from '../TextareaInput';
import TextInput from '../TextInput';

export type ImageGridType = {
  title?: string;
  imgUrl?: string;
  link?: string;
};

type ImageGridInputProps = {
  data: ImageGridType[];
  onChange: (val: ImageGridType[]) => void;
  isOriginal?: boolean;
};

function ImageGridInput({ data, onChange, isOriginal }: ImageGridInputProps) {
  const handleChangeImageGrid = (val: ImageGridType, i: number) => {
    const prevImgGrid = [...data];
    prevImgGrid.splice(i, 1, val);
    onChange(prevImgGrid);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {data?.map((imageGrid, i) => (
          <div
            key={i}
            className={
              isOriginal ? 'bg-white shadow rounded-xl p-3 relative' : ''
            }
          >
            <div
              className="absolute cursor-pointer bg-gray-200 rounded-full right-[-8px] top-[-8px] text-red-400"
              onClick={() => {
                onChange(data.filter((imgGrid, i2) => i2 !== i));
              }}
            >
              <X />
            </div>
            {isOriginal && (
              <TextAreaInput
                value={imageGrid.title}
                onValueChange={val =>
                  handleChangeImageGrid(
                    {
                      ...imageGrid,
                      title: val as string
                    },
                    i
                  )
                }
                containerClassName="mb-3"
                className="!h-20"
              />
            )}
            <ImageInput
              data={imageGrid.imgUrl}
              onChange={val =>
                handleChangeImageGrid(
                  {
                    ...imageGrid,
                    imgUrl: val as string
                  },
                  i
                )
              }
            />
            <TextInput
              value={imageGrid.link}
              onValueChange={val =>
                handleChangeImageGrid(
                  {
                    ...imageGrid,
                    link: val as string
                  },
                  i
                )
              }
              containerClassName="mt-3"
              placeholder="Enter url link"
            />
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          onChange([...(data || []), { title: '' }]);
        }}
        className="mt-3"
      >
        Add Image
      </Button>
    </>
  );
}

export default ImageGridInput;
