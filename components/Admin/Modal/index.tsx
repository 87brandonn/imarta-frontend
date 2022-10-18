import { Dialog, Transition } from '@headlessui/react';
import { title } from 'process';
import { Fragment, useState } from 'react';

type ModalActionProps =
  | {
      isActionable?: false;
      saveText?: never;
      cancelText?: never;
      onCancel?: never;
      onSave?: never;
    }
  | {
      isActionable: true;
      saveText?: string;
      cancelText?: string;
      onCancel?: () => void;
      onSave?: () => void;
    };

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onChangeOpen?: (val: boolean) => void;
  children: React.ReactNode;
} & ModalActionProps;

export default function Modal({
  isOpen,
  onChangeOpen,
  children,
  title,
  isActionable,
  saveText = 'Submit',
  cancelText = 'Cancel',
  onCancel = () => onChangeOpen?.(false),
  onSave
}: ModalProps) {
  function closeModal() {
    onChangeOpen?.(false);
  }

  function openModal() {
    onChangeOpen?.(true);
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-5">{children}</div>

                  {isActionable && (
                    <div className="flex gap-3 mt-5">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onCancel}
                      >
                        {cancelText}
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onSave}
                      >
                        {saveText}
                      </button>
                    </div>
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
