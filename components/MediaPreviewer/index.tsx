import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/future/image';
import { Fragment, useCallback } from 'react';
import { X } from 'react-feather';
import { ImageInputType } from '../Admin/ImageInput';

type PreviewerDataType = {
  url?: string;
  type?: ImageInputType['type'];
};

type ModalProps = {
  isOpen: boolean;
  onChangeOpen?: (val: boolean) => void;
  isSingle?: boolean;
  data: PreviewerDataType | PreviewerDataType[];
};

export default function MediaPreviewer({
  isOpen,
  onChangeOpen,
  data
}: ModalProps) {
  function closeModal() {
    onChangeOpen?.(false);
  }

  const renderMedia = useCallback((media: PreviewerDataType) => {
    return media.type === 'image' ? (
      <Image
        src={media.url!}
        className="object-cover w-full h-auto grayscale-0 rounded-2xl"
        sizes="100vw"
        width={0}
        height={0}
        alt="previewer-img"
      />
    ) : media.type === 'video' ? (
      <video src={media.url} className="rounded-2xl" controls />
    ) : (
      <iframe
        className="w-full h-96 rounded-2xl"
        src={`https://www.youtube.com/embed/${media.url!}`}
      />
    );
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={
                    'w-full max-w-xl transform bg-transparent rounded-2xl text-left align-middle transition-all'
                  }
                >
                  <div
                    className="absolute top-2 right-2 cursor-pointer text-white rounded-full w-8 h-8 border-white border-2 flex justify-center items-center z-10"
                    onClick={closeModal}
                  >
                    <X className="text-white" />
                  </div>
                  {Array.isArray(data) ? (
                    <div className="flex flex-col gap-12">
                      {data.map((media, i) => (
                        <Fragment key={i}>{renderMedia(media)}</Fragment>
                      ))}
                    </div>
                  ) : (
                    <>{renderMedia(data)}</>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
