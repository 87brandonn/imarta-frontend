import Image from 'next/future/image';
import React, { useMemo, useRef, useState } from 'react';
import { Aperture, Camera, Link, Trash, X } from 'react-feather';
import toast from 'react-hot-toast';
import uploadImage from '../../../utils/uploadFile';
import Button from '../Button';
import TextInput from '../TextInput';
import ImageRecommendationsModal from './ImageRecommendationsModal';
import ImageLinkInput from './LinkInput';

const getYoutubeUrlId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export type ImageInputType = {
  imgUrl?: string;
  link?: string;
  type?: 'image' | 'video' | 'embed';
};

type ImageInputProps = {
  data?: ImageInputType;
  accept?: NonNullable<ImageInputType['type']>[];
  onChange?: (val?: ImageInputType) => void;
  label?: string;
  onDelete?: () => void;
  withoutLink?: boolean;
};

function ImageInput({
  data,
  onChange,
  onDelete,
  label = 'Upload media',
  accept = ['embed', 'image', 'video'],
  withoutLink
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loadingUpload, setLoadingUpload] = useState(false);

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoadingUpload(true);
    const files = event.target.files?.[0];

    try {
      if (!files) throw new Error('No file found');
      const fileSizeInMb = (files.size / (1024 * 1024)).toFixed(2);
      if (parseInt(fileSizeInMb, 10) > 30) {
        throw new Error(
          `File size ${fileSizeInMb}mb exceed maximum 30mb. Please upload a new one`
        );
      }
      const imgUrl = await uploadImage(
        files,
        files.type.includes('video') ? 'video' : 'image'
      );
      onChange?.({
        ...data,
        imgUrl,
        type: files.type.includes('video') ? 'video' : 'image'
      });
    } catch (err) {
      toast.error(err instanceof Error ? err?.message : 'Something went wrong');
    } finally {
      setLoadingUpload(false);
    }
  };

  const [url, setUrl] = useState('');

  const [showUrlInput, setShowUrlInput] = useState(false);

  const [show, setShow] = useState(false);

  const acceptedFileInput = useMemo(() => {
    const defaultAccepted = ['image/*'];
    if (accept.includes('video')) {
      defaultAccepted.push('video/*');
    }
    return defaultAccepted;
  }, [accept]);

  return (
    <div>
      {show && (
        <ImageRecommendationsModal
          onSave={val => {
            setShow(false);
            onChange?.({ ...data, imgUrl: val?.imgUrl, type: val?.type });
          }}
          accept={accept}
          show={show}
          onChangeShow={setShow}
        />
      )}
      {showUrlInput ? (
        <div className="mb-3">
          <div className="flex items-center mb-1">
            <TextInput
              value={url}
              onChange={({ target: { value } }) => setUrl(value)}
              placeholder="Enter youtube url"
              className="grow"
            />
            <X
              className="cursor-pointer"
              onClick={() => setShowUrlInput(false)}
            />
          </div>
          <Button
            onClick={() => {
              onChange?.({
                ...data,
                imgUrl: getYoutubeUrlId(url) || undefined,
                type: 'embed'
              });
              setShowUrlInput(false);
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <>
          {loadingUpload ? (
            'Uploading file...'
          ) : !data?.imgUrl || !data?.type ? (
            <div>
              <div
                className="text-violet-400 mb-3 cursor-pointer underline text-sm"
                onClick={() => setShow(true)}
              >
                Choose from gallery
              </div>
              {accept.includes('embed') && (
                <div
                  className="text-violet-400 mb-3 cursor-pointer underline text-sm"
                  onClick={() => setShowUrlInput(true)}
                >
                  Enter youtube url
                </div>
              )}
              <div
                className="flex-1 text-violet-400 cursor-pointer underline text-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                {label}
              </div>
            </div>
          ) : (
            <>
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
                  {accept.includes('embed') && (
                    <div className="p-2 bg-white rounded-full">
                      <Link
                        className="cursor-pointer"
                        size={16}
                        onClick={() => setShowUrlInput(true)}
                      />
                    </div>
                  )}
                  <div className="p-2 bg-white rounded-full">
                    <Trash
                      className="cursor-pointer text-red-400"
                      size={16}
                      onClick={() => {
                        onChange?.({
                          ...data,
                          imgUrl: undefined,
                          type: undefined
                        });
                        onDelete?.();
                      }}
                    />
                  </div>
                </div>
                {data.type === 'image' ? (
                  <Image
                    src={data.imgUrl as string}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto group-hover:opacity-40 rounded-xl"
                    alt="hero"
                  />
                ) : data.type === 'video' ? (
                  <video src={data.imgUrl} controls />
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${data.imgUrl}`}
                    className="w-full"
                  />
                )}
              </div>
            </>
          )}
        </>
      )}

      {!withoutLink && (
        <>
          <ImageLinkInput
            value={data?.link || ''}
            onChange={val => onChange?.({ ...data, link: val })}
          />
        </>
      )}

      <input
        type="file"
        hidden
        accept={acceptedFileInput.join(', ')}
        ref={fileInputRef}
        onChange={handleChangeFile}
      />
    </div>
  );
}

export default ImageInput;
