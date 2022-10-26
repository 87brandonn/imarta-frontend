import Image from 'next/future/image';
import React, { useRef, useState } from 'react';
import { Aperture, Camera, Trash } from 'react-feather';
import uploadImage from '../../../utils/uploadFile';
import ImageRecommendationsModal from './ImageRecommendationsModal';

type ImageInputProps = {
  data?: string;
  onChange?: (val?: string) => void;
  label?: string;
  onDelete?: () => void;
};

function ImageInput({
  data,
  onChange,
  onDelete,
  label = 'Upload Image'
}: ImageInputProps) {
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

  const [show, setShow] = useState(false);

  return (
    <div>
      {show && (
        <ImageRecommendationsModal
          onSave={val => {
            setShow(false);
            onChange?.(val);
          }}
          show={show}
          onChangeShow={setShow}
        />
      )}
      {loadingUpload ? (
        'Uploading file...'
      ) : !data ? (
        <div className="flex justify-center gap-2">
          <div
            className="text-violet-400 mb-3 cursor-pointer underline text-sm"
            onClick={() => setShow(true)}
          >
            Choose from gallery
          </div>
          <div
            className="flex-1 text-violet-400 cursor-pointer underline text-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            {label}
          </div>
        </div>
      ) : (
        <div className="my-2 group inline-block relative">
          <div className="opacity-0 transition-opacity group-hover:opacity-100 absolute inset-0 z-10 flex gap-2 justify-center items-center">
            <div className="p-2 bg-white rounded-full">
              <Aperture
                className="cursor-pointer"
                size={16}
                onClick={() => setShow(true)}
              />
            </div>
            <div className="p-2 bg-white rounded-full">
              <Camera
                className="cursor-pointer"
                size={16}
                onClick={() => fileInputRef.current?.click()}
              />
            </div>
            <div className="p-2 bg-white rounded-full">
              <Trash
                className="cursor-pointer text-red-400"
                size={16}
                onClick={() => {
                  onChange?.('');
                  onDelete?.();
                }}
              />
            </div>
          </div>
          <Image
            src={data}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto group-hover:opacity-40 rounded-xl"
            alt="hero"
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
