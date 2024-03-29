import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Trash } from 'react-feather';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import * as yup from 'yup';
import usePeriod from '../../../hooks/usePeriod';
import getDepartmentById from '../../../services/api/getDepartmentById';
import getPeriodById from '../../../services/api/getPeriodById';
import { Department, Period, WorkProgram } from '../../../types';
import Button from '../Button';
import PeriodDepartmentOptions from './PeriodDepartmentOptions';

export type RepositoryFromApi = {
  periodId: number;
  isComingSoon: boolean;
  departments: {
    id: number;
  }[];
};

export type RepositoryDepartment = {
  department?: Department;
};

export type RepositoryForm = {
  repository: {
    period?: Period;
    isComingSoon?: boolean;
    departments?: RepositoryDepartment[];
  }[];
};

type RepositoryInputProps = {
  data?: RepositoryFromApi[];
  onChange?: (val?: RepositoryFromApi[]) => void;
};

const schema = yup
  .object({
    repository: yup
      .array(
        yup.object({
          period: yup.mixed<Period>().required().label('Period'),
          departments: yup
            .mixed<RepositoryDepartment>()
            .required()
            .label('Department')
        })
      )
      .min(1)
      .label('Section')
  })
  .required();

function RepositoryInput({ data, onChange }: RepositoryInputProps) {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue
  } = useForm<RepositoryForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      repository: undefined
    }
  });

  useEffect(() => {
    (async () => {
      const repository = await Promise.all(
        data?.map(async repositoryData => {
          const [period, ...departments] = await Promise.all([
            getPeriodById(repositoryData.periodId),
            ...(repositoryData.departments || []).map(async dep => {
              const [department] = await Promise.all([
                getDepartmentById(dep.id)
              ]);
              return {
                department
              };
            })
          ]);
          return {
            period,
            departments,
            isComingSoon: repositoryData.isComingSoon
          };
        }) || []
      );
      reset({
        repository
      });
    })();
  }, [data, reset]);

  const {
    append,
    remove,
    fields: repositoryFields
  } = useFieldArray({
    control,
    name: 'repository'
  });

  const { data: periodsData, isLoading: isLoadingPeriods } = usePeriod();

  const onSubmit = (data: RepositoryForm) => {
    onChange?.(
      data.repository
        .filter(repository => !!repository.period)
        .map(repository => ({
          periodId: repository.period!.id,
          departments:
            repository.departments
              ?.filter(deps => !!deps.department)
              .map(dep => ({
                id: dep.department!.id
              })) || [],
          isComingSoon: repository.isComingSoon || false
        }))
    );
  };

  return (
    <>
      <div className="mb-3">
        {repositoryFields?.map((repository, i) => (
          <div
            className="mb-2 border-b border-amber-500 last:border-none"
            key={repository.id}
          >
            <div className="flex items-center gap-3">
              <div className="grow">
                <div>Section {i + 1}</div>
                <div className="flex  items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    {...register(`repository.${i}.isComingSoon`)}
                  />
                  <div className="text-gray-400">Coming soon</div>
                </div>

                <Controller
                  control={control}
                  name={`repository.${i}.period`}
                  render={({ field: periodField }) => (
                    <>
                      <div className="mb-5">
                        <Select
                          options={periodsData}
                          isLoading={isLoadingPeriods}
                          getOptionLabel={opt => opt.label}
                          getOptionValue={opt => opt.id.toString()}
                          placeholder="Select period"
                          {...periodField}
                          onChange={val => {
                            periodField.onChange(val);
                            setValue(`repository.${i}.departments`, []);
                          }}
                        />
                        <p className="text-red-500">
                          {errors.repository?.[i]?.period?.message}
                        </p>
                      </div>
                      <PeriodDepartmentOptions
                        control={control}
                        index={i}
                        id={periodField.value?.id}
                        setValue={setValue}
                      />
                    </>
                  )}
                />
              </div>
              <Trash
                className="text-red-500 cursor-pointer"
                onClick={() => remove(i)}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() =>
          append({
            period: undefined,
            departments: undefined,
            isComingSoon: undefined
          })
        }
      >
        Add section
      </Button>
      <p className="text-red-500">{errors.repository?.message}</p>

      <div className="mt-4">
        <Button onClick={() => handleSubmit(onSubmit)()}>Save</Button>
      </div>
    </>
  );
}

export default RepositoryInput;
