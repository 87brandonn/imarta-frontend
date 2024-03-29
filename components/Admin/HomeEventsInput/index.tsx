import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { AsyncPaginate } from 'react-select-async-paginate';
import * as yup from 'yup';
import useLoadWorkPrograms from '../../../hooks/options/useLoadWorkPrograms';
import getWorkProgramById from '../../../services/api/getWorkProgramById';
import { WorkProgramWithAssociation } from '../../../services/api/getWorkPrograms';
import { WorkProgram } from '../../../types';
import { DeepPartial } from '../../../types/utils/deepPartial';
import Button from '../Button';
import TextInput from '../TextInput';
import ModalWorkProgramDocumentation from './ModalWorkProgramDocumentation';

export type HomeEventForm = {
  homeEvents: HomeEventFormType[];
};

export type HomeEventFormType = {
  workProgram?: WorkProgram;
  documentationId?: number | null;
  title: string;
};

export type HomeEventTypeFromApi = {
  title: string;
  workProgramId: number;
  documentationId?: number | null;
};

type HomeEventsInputProps = {
  data: HomeEventTypeFromApi[];
  onChange: (val: DeepPartial<HomeEventTypeFromApi>[]) => void;
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
          documentationId: yup.number().label('Documentation'),
          title: yup.string().label('Title')
        })
      )
      .min(1)
      .label('Name')
      .required()
  })
  .required();

function HomeEventsInput({ data, onChange }: HomeEventsInputProps) {
  const [showModal, setShowModal] = useState(false);
  const [workProgramId, setWorkProgramId] = useState<number>();
  const [workProgramIndex, setWorkProgramIndex] = useState<number>();

  const {
    control,
    formState: { errors },
    reset,
    register,
    handleSubmit,
    setValue
  } = useForm<HomeEventForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      homeEvents: [
        {
          workProgram: undefined,
          documentationId: undefined
        }
      ]
    }
  });

  const {
    append,
    remove,
    fields: homeEventFields
  } = useFieldArray({
    control,
    name: 'homeEvents'
  });

  useEffect(() => {
    (async () => {
      const homeEvents = await Promise.all(
        data.map(async homeEventData => {
          const workProgram = await getWorkProgramById(
            homeEventData.workProgramId
          );
          return {
            workProgram,
            documentationId: homeEventData.documentationId,
            title: homeEventData.title
          };
        })
      );
      reset({
        homeEvents
      });
    })();
  }, [data, reset, setValue]);

  const loadWorkPrograms = useLoadWorkPrograms();

  const onSubmit = ({ homeEvents }: HomeEventForm) => {
    onChange(
      homeEvents.map(homeEvent => ({
        workProgramId: homeEvent.workProgram?.id,
        documentationId: homeEvent.documentationId ?? null,
        title: homeEvent.title
      }))
    );
  };

  return (
    <>
      {showModal && workProgramIndex !== undefined && (
        <ModalWorkProgramDocumentation
          onChangeShow={setShowModal}
          control={control}
          index={workProgramIndex}
          showModal={showModal}
          id={workProgramId}
        />
      )}
      <div className="grid grid-cols-3 gap-4">
        {homeEventFields.map((homeEvent, i) => (
          <div key={homeEvent.id}>
            <TextInput
              {...register(`homeEvents.${i}.title`)}
              placeholder="Enter title"
              className="mb-2"
            />
            <div className="flex gap-3">
              <div>
                <Controller
                  control={control}
                  name={`homeEvents.${i}.workProgram`}
                  defaultValue={homeEvent.workProgram}
                  render={({ field: { onChange, ...rest } }) => (
                    <>
                      <AsyncPaginate
                        loadOptions={loadWorkPrograms}
                        additional={{
                          page: 0
                        }}
                        className="w-48"
                        getOptionLabel={opt => opt.name}
                        getOptionValue={opt => opt.id.toString()}
                        onChange={val => {
                          onChange(val);
                          setValue(`homeEvents.${i}.documentationId`, 0);
                        }}
                        {...rest}
                      />
                      {rest.value && (
                        <div
                          className="text-violet-400 text-sm cursor-pointer underline"
                          onClick={() => {
                            setWorkProgramId(rest.value?.id);
                            setWorkProgramIndex(i);
                            setShowModal(true);
                          }}
                        >
                          Choose thumbnail
                        </div>
                      )}
                    </>
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

            <p className="text-red-500 text-sm">
              {errors.homeEvents?.[i]?.workProgram?.message}
            </p>
            <p className="text-red-500 text-sm">
              {errors.homeEvents?.[i]?.documentationId?.message}
            </p>
          </div>
        ))}
        <div className="my-3">
          <Button
            onClick={() => {
              append({
                workProgram: undefined,
                documentationId: undefined,
                title: ''
              });
            }}
          >
            Add Event
          </Button>
        </div>
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
