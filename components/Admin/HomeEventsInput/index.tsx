import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { AsyncPaginate } from 'react-select-async-paginate';
import * as yup from 'yup';
import getWorkPrograms, {
  WorkProgramWithAssociation
} from '../../../services/api/getWorkPrograms';
import { WorkProgramDocumentation } from '../../../types';
import { DeepPartial } from '../../../types/utils/deepPartial';
import Button from '../Button';

export type HomeEventForm = {
  homeEvents: HomeEventType[];
};

export type HomeEventType = {
  workProgram?: WorkProgramWithAssociation;
  documentation?: WorkProgramDocumentation;
};

type HomeEventsInputProps = {
  data: HomeEventType[];
  onChange: (val: DeepPartial<HomeEventType>[]) => void;
};

const schema = yup
  .object({
    homeEvents: yup
      .array(
        yup.object({
          workProgram: yup
            .mixed<WorkProgramWithAssociation>()
            .required()
            .label('Work program'),
          documentation: yup.mixed<WorkProgramDocumentation>()
        })
      )
      .min(1)
      .label('Name')
      .required()
  })
  .required();

function HomeEventsInput({ data, onChange }: HomeEventsInputProps) {
  const {
    control,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
    setValue
  } = useForm<HomeEventForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      homeEvents: []
    }
  });

  useEffect(() => {
    reset({
      homeEvents:
        data?.map(hE => ({
          workProgram: hE.workProgram,
          documentation: hE.documentation
        })) || []
    });
  }, [data, reset, setValue]);

  const {
    fields: homeEventFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'homeEvents'
  });

  const loadWorkPrograms = async (
    search: string,
    _: any,
    { page: additionalPage }: any
  ) => {
    const data = await getWorkPrograms({
      name: search || undefined,
      page: additionalPage,
      limit: 10
    });

    return {
      options: data.data,
      hasMore: data.meta.page < data.meta.totalPage,
      additional: {
        page: data.meta.page
      }
    };
  };

  const onSubmit = ({ homeEvents }: HomeEventForm) => {
    onChange(
      homeEvents.map(homeEvent => ({
        ...homeEvent,
        workProgram: {
          ...(homeEvent.workProgram || {}),
          workProgramDepartments: undefined,
          workProgramDocumentations: undefined,
          workProgramFields: undefined
        }
      }))
    );
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {homeEventFields.map((homeEvent, i) => (
          <div key={homeEvent.id}>
            <Controller
              control={control}
              name={`homeEvents.${i}.workProgram`}
              render={({ field }) => (
                <AsyncPaginate
                  loadOptions={loadWorkPrograms}
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
            <div className="grid grid-cols-2 gap-2 mt-3">
              {watch(`homeEvents`) &&
                (!watch(`homeEvents.${i}.workProgram`)
                  ?.workProgramDocumentations?.length ? (
                  <div className="text-sm text-gray-400">
                    No documentation found. Thumbnail will not be shown on
                    website
                  </div>
                ) : (
                  watch(
                    `homeEvents.${i}.workProgram`
                  )?.workProgramDocumentations.map(documentation => (
                    <div key={documentation.id}>
                      <div className="flex">
                        <input
                          checked={
                            watch(`homeEvents.${i}.documentation`)?.id ===
                            documentation.id
                          }
                          onChange={({ target: { checked } }) =>
                            setValue(
                              `homeEvents.${i}.documentation`,
                              documentation
                            )
                          }
                          type="radio"
                          className="mr-2"
                        />
                        <div className="text-sm text-gray-400">
                          Mark as thumbnail
                        </div>
                      </div>
                      <img
                        src={documentation.imgUrl}
                        alt="documentation"
                        className=" w-24 h-24 object-contain rounded-xl"
                      />
                    </div>
                  ))
                ))}
            </div>
            <p className="text-red-500">
              {errors.homeEvents?.[i]?.workProgram?.message}
            </p>
            <Button
              onClick={() => {
                remove(i);
              }}
              className="mt-3"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="my-3">
        <Button
          onClick={() => {
            append({
              workProgram: undefined,
              documentation: undefined
            });
          }}
        >
          Add Event
        </Button>
      </div>

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

export default HomeEventsInput;
