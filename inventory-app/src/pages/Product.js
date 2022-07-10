import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../components/Breadcrumb'
import {
  deleteProduct,
  listProducts,
  searchProduct,
} from '../redux/action/productAction'
import ProductCard from '../components/ProductCard'

import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, PlusIcon, SearchIcon } from '@heroicons/react/outline'
import ProductRow from '../components/ProductRow'
import Modal from '../components/Modal'
import { ToastContainer } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'
import ErrorScreen from '../components/ErrorScreen'
import DisplayStyleButtons from '../components/DisplayStyleButtons'
import { Combobox } from '@headlessui/react'

const Product = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [grid, setGrid] = useState('list')
  const [selectedProduct, setSelectedProduct] = useState({})

  const changeViewToGrid = () => {
    setGrid('grid')
    localStorage.setItem('viewStyle', JSON.stringify('grid'))
  }
  const changeViewToList = () => {
    setGrid('list')
    localStorage.setItem('viewStyle', JSON.stringify('list'))
  }

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

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete } = productDelete

  useEffect(() => {
    dispatch(listProducts())
    const getViewStyle = () => {
      const viewStyle = localStorage.getItem('viewStyle')
      if (viewStyle) {
        setGrid(JSON.parse(viewStyle))
      }
    }
    getViewStyle()
  }, [dispatch])

  return (
    <Fragment>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        product={selectedProduct}
        handleAction={handleDelete}
        loading={loadingDelete}
      />
      <Breadcrumb className='z-20' pageName={'Products Page'} />
      {loading ? (
        <>
          <div className='ml-4 mt-2 w-20 cursor-pointer rounded-md p-2 text-sm  hover:bg-gray-200'>
            <Skeleton className='h-8 ' />
          </div>
          <div className='w-full py-4 px-4'>
            <div className='min-h-screen rounded-lg bg-white px-4 pt-4 pb-6 shadow-md'>
              <Skeleton />
              <div className='border-slate relative rounded-xl border bg-gray-50 bg-opacity-75 shadow-sm'>
                <div className='scrollbar mt-4 max-h-[80vh] overflow-auto bg-gray-50 bg-opacity-75 pb-8'>
                  <table className='w-full table-auto border-collapse px-4 text-sm'>
                    <thead ame='z-10'>
                      <tr>
                        <th className='sticky  top-0 z-10 max-w-md border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left text-slate-500 backdrop-blur'>
                          <Skeleton />
                        </th>

                        <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                          <Skeleton />
                        </th>
                        <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                          <Skeleton />
                        </th>
                        <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                          <Skeleton />
                        </th>
                        <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                          <Skeleton />
                        </th>
                        <th className='sticky top-0 z-10 min-w-fit border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                          <Skeleton />
                        </th>
                        <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                          <Skeleton />
                        </th>
                        <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left text-center  text-slate-500 backdrop-blur'>
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
            className='ml-4 mt-2 inline-flex cursor-pointer items-center rounded-md p-2 text-sm  hover:bg-gray-200'
            onClick={() => {
              navigate(-1)
            }}
          >
            <ArrowLeftIcon className='mr-2 h-4 w-4' /> Kembali
          </div>
          <div className='w-full py-4 px-4'>
            <div className='min-h-screen divide-y rounded-lg bg-white px-4 pt-4 pb-6 shadow-md'>
              <div className='mb-6 flex items-center justify-between'>
                <Link to='/create-product'>
                  <div className='btn primary icon inline-flex items-center'>
                    <PlusIcon className='mr-2 h-5 w-5' />
                    <span className=' text-sm'>Tambah Produk</span>
                  </div>
                </Link>
                <div className='flex max-w-3xl flex-grow items-center space-x-6'>
                  <Combobox
                    className={
                      'flex-grow rounded-lg border bg-white px-4 focus:border-primary-blue'
                    }
                    as={'div'}
                  >
                    <div className='flex items-center space-x-1'>
                      <SearchIcon className='h-5 w-5 text-slate-600' />
                      <Combobox.Input
                        className={
                          'w-full border-none bg-transparent text-sm placeholder-gray-300 focus:border-none focus:ring-0'
                        }
                        placeholder='Cari Produk'
                        onChange={(e) => {
                          // TODO setting query
                          dispatch(searchProduct(e.target.value))
                        }}
                      />
                    </div>
                  </Combobox>

                  <DisplayStyleButtons
                    changeViewToGrid={changeViewToGrid}
                    changeViewToList={changeViewToList}
                  />
                  {products ? (
                    <h4 className='font-body text-sm text-slate-700'>
                      Jumlah produk : {products.length}
                    </h4>
                  ) : (
                    'error'
                  )}
                </div>
              </div>

              {grid === 'grid' ? (
                <div className='grid min-h-screen w-full gap-x-4 gap-y-6 p-3 lg:grid-cols-4'>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className='border-slate relative rounded-xl border bg-gray-50 bg-opacity-75 shadow-sm'>
                  <div className='scrollbar mt-4 max-h-[80vh] overflow-auto bg-gray-50 bg-opacity-75 pb-8'>
                    <table className='w-full table-auto border-collapse px-4 text-sm'>
                      <thead ame='z-10'>
                        <tr>
                          <th className='sticky  top-0 z-10 max-w-md border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left text-slate-500 backdrop-blur'>
                            Nama Produk
                          </th>

                          <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                            Merk
                          </th>
                          <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                            Model
                          </th>
                          <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                            Spesifikasi
                          </th>
                          <th className='sticky top-0 z-10 w-fit border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                            Tipe
                          </th>
                          <th className='sticky top-0 z-10 min-w-fit border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                            Harga
                          </th>
                          <th className='sticky top-0 z-10 w-fit border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left  text-slate-500 backdrop-blur'>
                            Status
                          </th>
                          <th className='sticky top-0 z-10 border-b border-slate-400 bg-gray-50 bg-opacity-75 px-4 pb-2 text-left text-center  text-slate-500 backdrop-blur'>
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
              )}
            </div>
          </div>
        </>
      )}
    </Fragment>
  )
}

export default Product
