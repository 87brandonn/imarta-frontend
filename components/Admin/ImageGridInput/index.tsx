import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { X } from 'react-feather';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../Button';
import ImageInput from '../ImageInput';
import TextAreaInput from '../TextareaInput';
import TextInput from '../TextInput';

export type ImageGridFormType = {
  imageGrid: ImageGridType[];
};

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

const schema = yup
  .object({
    imageGrid: yup
      .array(
        yup.object({
          title: yup.string().label('Title'),
          imgUrl: yup.string().required().label('Image'),
          link: yup.string().label('Link')
        })
      )
      .min(1)
      .label('Image grid')
      .required()
  })
  .required();

function ImageGridInput({ data, onChange, isOriginal }: ImageGridInputProps) {
  const {
    control,
    watch,
    formState: { errors },
    reset,
    register,
    handleSubmit,
    setValue
  } = useForm<ImageGridFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      imageGrid: []
    }
  });

  useEffect(() => {
    setValue('imageGrid', data);
  }, [data, setValue]);

  const { append, remove } = useFieldArray({
    control,
    name: 'imageGrid'
  });

  const handleChangeImageGrid = (val: ImageGridType, i: number) => {
    const prevImgGrid = [...data];
    prevImgGrid.splice(i, 1, val);
    onChange(prevImgGrid);
  };

  const onSubmit = (data: ImageGridFormType) => {
    onChange(data.imageGrid);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {watch('imageGrid')?.map((imageGrid, i) => (
          <div key={i} className={'bg-white shadow rounded-xl p-3 relative'}>
            <div
              className="absolute cursor-pointer bg-gray-200 rounded-full right-[-8px] top-[-8px] text-red-400"
              onClick={() => {
                remove(i);
              }}
            >
              <X />
            </div>
            {isOriginal && (
              <TextAreaInput
                {...register(`imageGrid.${i}.title`)}
                placeholder="Enter title"
                className="!h-20 mb-3"
              />
            )}
            <div className="mb-3">
              <Controller
                control={control}
                name={`imageGrid.${i}.imgUrl`}
                render={({ field }) => (
                  <ImageInput data={field.value} onChange={field.onChange} />
                )}
              />
              <p className="text-red-500">
                {errors.imageGrid?.[i]?.imgUrl?.message}
              </p>
            </div>
            <TextInput
              {...register(`imageGrid.${i}.link`)}
              className="mt-2"
              placeholder="Enter url link"
            />
          </div>
        ))}
        <div>
          <Button
            onClick={() => {
              append({});
            }}
            className="mt-3"
          >
            Add Image
          </Button>
        </div>
      </div>
      <p className="text-red-500">{errors.imageGrid?.message}</p>
      <Button className="mt-4" onClick={() => handleSubmit(onSubmit)()}>
        Save
      </Button>
    </>
  );
}

export default ImageGridInput;
