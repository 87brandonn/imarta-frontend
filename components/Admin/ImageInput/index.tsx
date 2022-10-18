import Image from 'next/future/image';
import React, { useRef, useState } from 'react';
import uploadImage from '../../../utils/uploadFile';
import ImageRecommendationsModal from './ImageRecommendationsModal';

type ImageInputProps = {
  data?: string;
  onChange?: (val?: string) => void;
  label?: string;
};

function ImageInput({
  data,
  onChange,
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
        <div className="my-2 group inline-block cursor-pointer relative">
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
