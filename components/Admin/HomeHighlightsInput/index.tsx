import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { X } from 'react-feather';
import { AsyncPaginate } from 'react-select-async-paginate';
import getDepartmentById from '../../../services/api/getDepartmentById';
import getDepartments from '../../../services/api/getDepartments';
import { Department } from '../../../types';
import Button from '../Button';
import useLoadDepartments from '../../../hooks/options/useLoadDepartments';
import ImageInput from '../ImageInput';

export type HomeHighlightForm = {
  homeHighlights: HomeHighlightFormType[];
};

export type HomeHighlightFormType = {
  department?: Department;
  imageUrl?: string;
};

export type HomeHighlightTypeFromApi = {
  departmentId: number;
  imageUrl?: string;
};

type HomeHighlightsInputProps = {
  data: HomeHighlightTypeFromApi[];
  onChange: (val: Partial<HomeHighlightTypeFromApi>[]) => void;
};

const schema = yup
  .object({
    homeHighlights: yup
      .array(
        yup.object({
          department: yup.mixed<Department>().required().label('Department'),
          imageUrl: yup.string().label('Image')
        })
      )
      .min(1)
      .label('Home highlights')
      .required()
  })
  .required();

function HomeHighlightsInput({ data, onChange }: HomeHighlightsInputProps) {
  const {
    control,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
    setValue
  } = useForm<HomeHighlightForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      homeHighlights: [
        {
          department: undefined,
          imageUrl: undefined
        }
      ]
    }
  });

  const loadDepartments = useLoadDepartments();

  useEffect(() => {
    (async () => {
      const homeHighlights = await Promise.all(
        data
          .filter(data => !!data.departmentId)
          .map(async homeHighlightData => {
            const department = await getDepartmentById(
              homeHighlightData.departmentId
            );
            return {
              department,
              imageUrl: homeHighlightData.imageUrl
            };
          })
      );
      reset({
        homeHighlights
      });
    })();
  }, [data, reset, setValue]);

  const { append, remove } = useFieldArray({
    control,
    name: 'homeHighlights'
  });

  const onSubmit = ({ homeHighlights }: HomeHighlightForm) => {
    onChange(
      homeHighlights.map(homeHighlight => ({
        departmentId: homeHighlight.department?.id,
        imageUrl: homeHighlight.imageUrl
      }))
    );
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {watch('homeHighlights').map((homeHighlight, i) => (
          <div key={i}>
            <div className="flex gap-3">
              <div>
                <Controller
                  control={control}
                  name={`homeHighlights.${i}.department`}
                  render={({ field }) => (
                    <AsyncPaginate
                      loadOptions={loadDepartments}
                      additional={{
                        page: 0
                      }}
                      className="w-48"
                      getOptionLabel={opt => opt.name}
                      getOptionValue={opt => opt.id.toString()}
                      {...field}
                    />
                  )}
                />
              </div>
              <X
                onClick={() => {
                  remove(i);
                }}
                className="text-red-400 cursor-pointer"
              />
            </div>

            <Controller
              name={`homeHighlights.${i}.imageUrl`}
              control={control}
              render={({ field }) => (
                <ImageInput data={field.value} onChange={field.onChange} />
              )}
            />

            <p className="text-red-500 text-sm">
              {errors.homeHighlights?.[i]?.department?.message}
            </p>
          </div>
        ))}
        <div className="my-3">
          <Button
            onClick={() => {
              append({
                department: undefined
              });
            }}
          >
            Add Event
          </Button>
        </div>
      </div>
      <p className="text-red-500 text-sm mt-3">
        {errors.homeHighlights?.message}
      </p>

      <Button
        onClick={() => {
          handleSubmit(onSubmit)();
        }}
        className="mt-3"
      >
        Save
      </Button>
    </>
  );
}

export default HomeHighlightsInput;
