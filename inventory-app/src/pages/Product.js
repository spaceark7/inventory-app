import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../components/Breadcrumb'
import { deleteProduct, listProducts } from '../redux/action/productAction'

import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import ProductRow from '../components/ProductRow'
import Modal from '../components/Modal'
import { ToastContainer } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'
import ErrorScreen from '../components/ErrorScreen'

const Product = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({})
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // Async needed to wait action finish before refetching data
  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id))
    closeModal()
    dispatch(listProducts())
  }

  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <Fragment>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        product={selectedProduct}
        handleAction={handleDelete}
      />
      <Breadcrumb className='z-20' pageName={'Products Page'} />
      {loading ? (
        <>
          <div className='text-sm ml-4 p-2 mt-2 w-20 cursor-pointer rounded-md  hover:bg-gray-200'>
            <Skeleton className='h-8 ' />
          </div>
          <div className='py-4 px-4 w-full'>
            <div className='bg-white min-h-screen pt-4 pb-6 px-4 rounded-lg shadow-md'>
              <Skeleton />
              <div className='relative rounded-xl bg-gray-50 bg-opacity-75 border border-slate shadow-sm'>
                <div className='max-h-[80vh] mt-4 pb-8 bg-gray-50 bg-opacity-75 overflow-auto scrollbar'>
                  <table className='table-auto w-full border-collapse text-sm px-4'>
                    <thead ame='z-10'>
                      <tr>
                        <th className='border-b  sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left max-w-md border-slate-400 text-slate-500'>
                          <Skeleton />
                        </th>

                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          <Skeleton />
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          <Skeleton />
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          <Skeleton />
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          <Skeleton />
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur min-w-fit bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          <Skeleton />
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          <Skeleton />
                        </th>
                        <th className='border-b text-center sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          <Skeleton />
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <tr key={index}>
                          {Array.from({ length: 8 }).map((_, index) => (
                            <td key={index} className='h-8'>
                              <Skeleton circle />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : error ? (
        <ErrorScreen error={error} />
      ) : (
        <>
          <div
            className='inline-flex items-center text-sm ml-4 p-2 mt-2 cursor-pointer rounded-md  hover:bg-gray-200'
            onClick={() => {
              navigate(-1)
            }}
          >
            <ArrowLeftIcon className='mr-2 w-4 h-4' /> Kembali
          </div>
          <div className='py-4 px-4 w-full'>
            <div className='bg-white min-h-screen pt-4 pb-6 px-4 rounded-lg shadow-md'>
              {products ? (
                <h4 className='font-body text-slate-700'>
                  Jumlah produk : {products.length}
                </h4>
              ) : (
                'error'
              )}
              <div className='relative rounded-xl bg-gray-50 bg-opacity-75 border border-slate shadow-sm'>
                <div className='max-h-[80vh] mt-4 pb-8 bg-gray-50 bg-opacity-75 overflow-auto scrollbar'>
                  <table className='table-auto w-full border-collapse text-sm px-4'>
                    <thead ame='z-10'>
                      <tr>
                        <th className='border-b  sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left max-w-md border-slate-400 text-slate-500'>
                          Nama Produk
                        </th>

                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          Merk
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          Model
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          Spesifikasi
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          Tipe Produk
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur min-w-fit bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          Harga
                        </th>
                        <th className='border-b sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          Status
                        </th>
                        <th className='border-b text-center sticky top-0 bg-gray-50 backdrop-blur bg-opacity-75 z-10 px-4 pb-2 text-left  border-slate-400 text-slate-500'>
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {products &&
                        products.map((product) => (
                          <ProductRow
                            isOpen={isOpen}
                            openModal={openModal}
                            closeModal={closeModal}
                            product={product}
                            setProduct={setSelectedProduct}
                            key={product.id}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  )
}

export default Product
