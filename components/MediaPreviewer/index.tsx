import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/future/image';
import { Fragment } from 'react';
import { X } from 'react-feather';
import { ImageInputType } from '../Admin/ImageInput';

type ModalProps = {
  isOpen: boolean;
  onChangeOpen?: (val: boolean) => void;
  src: string;
  type?: ImageInputType['type'];
};

export default function MediaPreviewer({
  isOpen,
  onChangeOpen,
  src,
  type = 'image'
}: ModalProps) {
  function closeModal() {
    onChangeOpen?.(false);
  }

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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div
                    className="absolute top-2 right-2 cursor-pointer text-white rounded-full w-8 h-8 border-white border-2 flex justify-center items-center z-10"
                    onClick={closeModal}
                  >
                    <X className="text-white" />
                  </div>
                  {type === 'image' ? (
                    <Image
                      src={src}
                      className="object-cover w-full h-auto grayscale-0"
                      sizes="100vw"
                      width={0}
                      height={0}
                      alt="previewer-img"
                    />
                  ) : type === 'video' ? (
                    <video src={src} />
                  ) : (
                    <iframe
                      className="w-full h-96"
                      src={`https://www.youtube.com/embed/${src}`}
                    />
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
