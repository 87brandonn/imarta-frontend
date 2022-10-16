import Image from 'next/future/image';
import React, { useRef, useState } from 'react';
import { X } from 'react-feather';
import uploadImage from '../../../utils/uploadFile';
import Button from '../Button';

type ImageInputProps = {
  data?: string;
  onChange?: (val?: string) => void;
  onDelete?: () => void;
};

function ImageInput({ data, onChange, onDelete }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loadingUpload, setLoadingUpload] = useState(false);

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoadingUpload(true);
    const files = event.target.files?.[0];
    if (!files) return;
    try {
      const imgUrl = await uploadImage(files);
      onChange?.(imgUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      {loadingUpload ? (
        'Uploading file...'
      ) : !data ? (
        <Button onClick={() => fileInputRef.current?.click()}>
          Upload Image
        </Button>
      ) : (
        <div className="my-2 group inline-block cursor-pointer relative">
          <div
            onClick={() => {
              onChange?.(undefined);
              onDelete?.();
            }}
            className="bg-white z-10 rounded-full text-red-400 absolute right-0 top-[-8px] transform"
          >
            <X />
          </div>
          <Image
            src={data}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto group-hover:opacity-40 rounded-xl"
            alt="hero"
            onClick={() => fileInputRef.current?.click()}
          />
        </div>
      )}
      <input
        type="file"
        hidden
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChangeFile}
      />
    </div>
  );
}

export default ImageInput;
