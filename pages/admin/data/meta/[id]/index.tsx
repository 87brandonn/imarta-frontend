import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Trash } from 'react-feather';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as yup from 'yup';
import Button from '../../../../../components/Admin/Button';
import ImageInput from '../../../../../components/Admin/ImageInput';
import TextInput from '../../../../../components/Admin/TextInput';
import useCreateOrEditMeta, {
  CreateOrUpdateMetaPayload
} from '../../../../../hooks/useCreateOrUpdateMeta';
import useMetaById from '../../../../../hooks/useMetaById';
import usePeriod from '../../../../../hooks/usePeriod';
import { Period } from '../../../../../types';

const schema = yup
  .object({
    id: yup.number(),
    title: yup.string().required().label('Title'),
    vision: yup.string().required().label('Vision'),
    period: yup.mixed<Period>().required().label('Period'),
    missions: yup
      .array()
      .of(
        yup.object({
          value: yup.string().required().label('Mission value')
        })
      )
      .min(1)
      .required()
      .label('Missions'),
    hierarchyImgUrl: yup.string().required().label('Hierarchy image')
  })
  .required();

function AdminMetaDetail() {
  const { query } = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    register
  } = useForm<CreateOrUpdateMetaPayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      vision: '',
      title: '',
      period: undefined,
      missions: []
    }
  });

  const { mutate } = useCreateOrEditMeta();
  const { data: periods } = usePeriod();

  const {
    fields: missionsFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'missions'
  });

  const onSubmit = (data: CreateOrUpdateMetaPayload) => {
    mutate(data);
  };

  const { data, isLoading } = useMetaById(query.id as string);

  useEffect(() => {
    reset({
      title: data?.title || '',
      vision: data?.vision || '',
      period: data?.period || undefined,
      missions: data?.organizationMetaMissions || [],
      hierarchyImgUrl: data?.hierarchyImgUrl || undefined,
      id: data?.id || undefined
    });
  }, [data, reset]);

  if (isLoading) return 'Loading..';

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter title"
          error={errors.title?.message}
          {...register('title')}
        />

        <TextInput
          label="Vision"
          placeholder="Enter vision"
          error={errors.vision?.message}
          {...register('vision')}
        />

        <div className="mb-3">
          <div>Period</div>
          <Controller
            name="period"
            control={control}
            render={({ field }) => (
              <Select
                options={periods}
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.id.toString()}
                {...field}
              />
            )}
          />
          <p className="text-red-500">{errors.period?.message}</p>
        </div>

        <div className="mb-3">
          <div>Missions</div>
          {missionsFields.map((documentation, i) => (
            <div key={documentation.id} className="flex gap-2">
              <div>
                <Controller
                  control={control}
                  name={`missions.${i}.value`}
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      value={value}
                      onChange={onChange}
                      placeholder="Enter missions"
                    />
                  )}
                />
                <p className="text-red-500">
                  {errors.missions?.[i]?.value?.message}
                </p>
              </div>
              <Trash onClick={() => remove(i)} />
            </div>
          ))}
          <Button
            onClick={() =>
              append({
                value: ''
              })
            }
            className="mt-2"
          >
            Add Missions
          </Button>

          <p className="text-red-500">{errors.missions?.message}</p>
        </div>

        <div className="mb-3">
          <div>Image Hierarchy</div>
          <Controller
            control={control}
            name="hierarchyImgUrl"
            render={({ field: { value, onChange } }) => (
              <ImageInput
                data={{ imgUrl: value, type: 'image' }}
                onChange={val => onChange(val?.imgUrl)}
                accept={['image']}
                withoutLink
              />
            )}
          />
          <p className="text-red-500">{errors.hierarchyImgUrl?.message}</p>
        </div>

        <Button type="submit" className="mt-5">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AdminMetaDetail;
