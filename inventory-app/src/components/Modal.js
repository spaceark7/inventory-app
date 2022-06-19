import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { Fragment, useRef } from 'react'

const Modal = ({ isOpen, closeModal, product, handleAction }) => {
  let deleteButtonRef = useRef(null)

  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          initialFocus={deleteButtonRef}
          as='div'
          className='relative z-50'
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-lg transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    <span className='inline-flex items-center'>
                      <ExclamationIcon className='mr-2 w-6 h-6 text-red-600' />
                      <h4>Hapus Produk</h4>
                    </span>
                  </Dialog.Title>
                  <div className='mt-2'>
                    <Dialog.Description>
                      Produk{' '}
                      <span className='font-bold'>{product.product_name}</span>{' '}
                      akan dihapus.
                    </Dialog.Description>
                  </div>

                  <div className='mt-6 flex gap-x-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none  '
                      onClick={closeModal}
                    >
                      Kembali
                    </button>
                    <button
                      ref={deleteButtonRef}
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                      onClick={() => handleAction(product.id)}
                    >
                      Hapus Produk
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}

export default Modal
