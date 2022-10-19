import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Trash, X } from 'react-feather';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as yup from 'yup';
import useMetas from '../../../hooks/useMetas';
import getMetaById from '../../../services/api/getMetaById';
import { OrganizationMeta } from '../../../types';
import Button from '../Button';

export type OrganizationStructure = {
  metaId: number;
};

type OrganizationStructureForm = {
  meta: {
    meta?: OrganizationMeta;
  }[];
};

type OrganizationStructureInputProps = {
  data?: OrganizationStructure[];
  onChange?: (val?: OrganizationStructure[]) => void;
};

const schema = yup
  .object({
    meta: yup
      .array(
        yup.object({
          meta: yup.mixed<OrganizationMeta>().required().label('Meta')
        })
      )
      .min(1)
      .label('Section')
  })
  .required();

function OrganizationStructureInput({
  data,
  onChange
}: OrganizationStructureInputProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<OrganizationStructureForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      meta: undefined
    }
  });

  useEffect(() => {
    (async () => {
      const meta = await Promise.all(
        data?.map(async orgStructure => {
          const meta = await getMetaById(orgStructure.metaId);
          return {
            meta
          };
        }) || []
      );
      reset({
        meta
      });
    })();
  }, [data, reset]);

  const {
    fields: metaFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'meta'
  });

  const { data: metaData, isLoading } = useMetas();

  const onSubmit = (data: OrganizationStructureForm) => {
    onChange?.(
      data.meta
        .filter(orgMeta => !!orgMeta.meta)
        .map(orgMeta => ({
          metaId: orgMeta.meta!.id
        }))
    );
  };

  return (
    <>
      <div className="mb-3">
        {watch('meta')?.map((orgMeta, i) => (
          <div className="mb-2" key={orgMeta.meta?.id}>
            <div className="flex items-center gap-3">
              <div className="grow">
                <div>Section {i + 1}</div>
                <Controller
                  control={control}
                  name={`meta.${i}.meta`}
                  render={({ field }) => (
                    <Select
                      isLoading={isLoading}
                      options={metaData}
                      getOptionLabel={opt => opt.title || 'Unnamed meta'}
                      getOptionValue={opt => opt.id.toString()}
                      {...field}
                    />
                  )}
                />
              </div>
              <Trash
                className="text-red-500 cursor-pointer"
                onClick={() => remove(i)}
              />
            </div>
            <p className="text-red-500">{errors.meta?.[i]?.meta?.message}</p>
          </div>
        ))}
      </div>
      <Button onClick={() => append({ meta: undefined })}>Add section</Button>
      <p className="text-red-500">{errors.meta?.message}</p>

      <div className="mt-4">
        <Button onClick={() => handleSubmit(onSubmit)()}>Save</Button>
      </div>
    </>
  );
}

export default OrganizationStructureInput;
