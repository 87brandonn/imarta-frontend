import { X } from 'react-feather';
import Button from '../Button';
import ImageInput from '../ImageInput';
import TextInput from '../TextInput';

export type HomeEventType = {
  imgUrl?: string;
  text1?: string;
  text2?: string;
  text3?: string;
};

type HomeEventsInputProps = {
  data: HomeEventType[];
  onChange: (val: HomeEventType[]) => void;
};

function HomeEventsInput({ data, onChange }: HomeEventsInputProps) {
  const handleChangeHomeEvent = <T extends keyof HomeEventType>(
    type: T,
    val: HomeEventType[T],
    i: number
  ) => {
    const prevData = [...data];
    prevData.splice(i, 1, {
      ...data[i],
      [type]: val
    });
    onChange(prevData);
  };

  return (
    <>
      <div className="grid gap-4">
        {data?.map((imageGrid, i) => (
          <div key={i} className={'bg-white shadow rounded-xl p-3 relative'}>
            <div
              className="absolute cursor-pointer bg-gray-200 rounded-full right-[-8px] top-[-8px] text-red-400"
              onClick={() => {
                onChange(data.filter((imgGrid, i2) => i2 !== i));
              }}
            >
              <X />
            </div>
            <TextInput
              value={imageGrid.text1}
              onValueChange={val =>
                handleChangeHomeEvent('text1', val as string, i)
              }
              placeholder="Enter text1"
              containerClassName="mb-3"
            />
            <TextInput
              value={imageGrid.text2}
              onValueChange={val =>
                handleChangeHomeEvent('text2', val as string, i)
              }
              placeholder="Enter text2"
              containerClassName="mb-3"
            />
            <TextInput
              value={imageGrid.text3}
              onValueChange={val =>
                handleChangeHomeEvent('text3', val as string, i)
              }
              placeholder="Enter text3"
              containerClassName="mb-3"
            />
            <ImageInput
              data={imageGrid.imgUrl}
              onChange={val =>
                handleChangeHomeEvent('imgUrl', val as string, i)
              }
            />
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          onChange([...(data || []), { text1: '', text2: '', text3: '' }]);
        }}
        className="mt-3"
      >
        Add Image
      </Button>
    </>
  );
}

export default HomeEventsInput;
