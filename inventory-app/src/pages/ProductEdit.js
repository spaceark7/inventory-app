import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { getUserDetail, updateUserDetail } from '../redux/action/userAction'
import { USER_UPDATE_RESET } from '../redux/constant'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/outline'
import {
  deleteProduct,
  getProductDetail,
  listProducts,
} from '../redux/action/productAction'
import Modal from '../components/Modal'
import { Switch } from '@headlessui/react'

const ProductEdit = () => {
  const { id } = useParams()
  const parentRef = useRef()
  const navigate = useNavigate()
  const [productName, setProductName] = useState('')
  const [SerialNumber, setSerialNumber] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [SKU, setSKU] = useState('')
  const [specification, setSpecification] = useState('')
  const [price, setPrice] = useState('')
  const [product_type, setProductType] = useState('')
  const [status, setStatus] = useState(true)

  const [image_path, setImagepath] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetail = useSelector((state) => state.productDetail)
  const { loading, product, error } = productDetail

  const permission = userInfo.access_level.find(
    (access) =>
      access.access_type === 'admin' || access.access_type === 'inventory'
  )

  const handleUpdate = (e) => {
    e.preventDefault()
  }

  const handleUpload = async (e) => {
    const image = e.target.files[0]
    setImagepath(URL.createObjectURL(image))
    console.log(e.target)
    const formData = new FormData()
    formData.append('image', image)
    console.log(formData)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/uploads', formData, config)
      setImagepath(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // Async needed to wait action finish before refetching data
  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
    closeModal()
    navigate(-1)
  }

  useEffect(() => {
    if (!permission) {
      navigate('/unauthorized')
    } else {
      if (!product || product.id !== parseInt(id)) {
        dispatch(getProductDetail(id))
      } else {
        setProductName(product.product_name)
        setImagepath(product.product_image)
        setBrand(product.brand)
        setModel(product.model)
        setSerialNumber(product.product_SN)
        setSKU(product.SKU)
        setSpecification(product.specification)
        setEnabled(product.status)
      }
    }
  }, [dispatch, userInfo, navigate, permission, id, product])

  return (
    <div ref={parentRef}>
      {product && (
        <Modal
          isOpen={isOpen}
          openModal={openModal}
          closeModal={closeModal}
          product={product}
          handleAction={handleDelete}
        />
      )}

      <ToastContainer />
      <Breadcrumb pageName={'Edit Profile'} />
      <div
        className='ml-4 mt-2 inline-flex cursor-pointer items-center rounded-md p-2 text-sm  hover:bg-gray-200'
        onClick={() => {
          navigate(-1)
        }}
      >
        <ArrowLeftIcon className='mr-2 h-4 w-4' /> Kembali
      </div>
      {loading ? (
        <div className='max-w-screen-lg py-2 px-4 '>
          <div className='flex flex-row rounded-lg bg-white pt-4 pb-6 pr-8 shadow-md'>
            <div className='profile-image relative mt-4  h-full rounded-full py-4 px-6 '>
              <div className='h-64 w-64 rounded-full  '>
                <Skeleton className='h-64 w-64 rounded-full' />
              </div>
              <div className='file: mt-2 h-20 text-sm font-medium file:mr-4 file:rounded-full file:border-0 file:bg-secondary-blue/20 file:py-2 file:px-4 file:text-sm file:text-primary-blue'>
                <Skeleton />
              </div>
            </div>
            <div className='w-full py-4 pl-6'>
              <h2 className='mb-4 max-w-sm text-xl font-bold text-slate-600'>
                <Skeleton />
              </h2>
              <form onSubmit={handleUpdate} action=''>
                <div className='mb-4 grid max-w-lg grid-cols-2'>
                  <Skeleton className='h-12' count={2} />
                </div>
                <div className='mb-8'>
                  <h2 className='mb-3 max-w-sm text-xl  font-bold text-slate-600'>
                    <Skeleton />
                  </h2>
                  <div className='flex max-w-sm flex-row flex-wrap'>
                    {Array.from({ length: 4 }).map((item, index) => (
                      <div
                        key={index}
                        className='mr-3 max-w-xs rounded-full py-2 px-4 text-xs font-semibold'
                      >
                        <Skeleton />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='border-b border-b-slate-300 pb-6'>
                  <h2 className='mb-4 max-w-xs text-xl font-bold text-slate-600'>
                    <Skeleton />
                  </h2>
                  <div className='grid grid-cols-2'>
                    <div className='mb-2 mr-3 max-w-xs'>
                      <Skeleton className='h-10' />
                    </div>

                    <div className='mb-2 mr-3 max-w-xs'>
                      <Skeleton className='h-10' />
                    </div>
                  </div>

                  <div className='mt-2 flex max-w-sm items-center justify-between text-sm'>
                    <Skeleton className='h-10' />
                    <span className='text-slate-600'>
                      <Skeleton />
                    </span>
                  </div>
                </div>
                <div className='mt-6 flex justify-end '>
                  <div className='h-24 max-w-sm'>
                    <Skeleton />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : error ? (
        'error'
      ) : (
        <div className='w-full py-2 px-4 lg:max-w-screen-lg'>
          <div className='flex flex-row rounded-lg bg-white pt-4 pb-6 pr-8 shadow-md'>
            <div className='profile-image relative mt-4  max-w-xs rounded-full py-4 px-6 lg:h-64 '>
              <img
                className='rounded-full object-cover object-fill object-center'
                src={image_path}
                alt={`profile of ${productName}`}
              />

              <input
                type='file'
                accept='image/*'
                name='image_upload'
                onChange={handleUpload}
                id='image_upload'
                className='file: mt-2 text-sm font-medium file:mr-4 file:rounded-full file:border-0 file:bg-secondary-blue/20 file:py-2 file:px-4 file:text-sm file:text-primary-blue'
              />
            </div>
            <div className='w-full py-4 pl-6 '>
              <h2 className='mb-4 text-xl font-bold text-slate-600'>
                Informasi Detail
              </h2>
              <div className='items-center justify-end lg:flex'>
                <div
                  onClick={openModal}
                  className='group mr-3 inline-flex transform items-center rounded-lg border border-red-400 p-2  text-sm text-red-600 transition duration-150 ease-out hover:cursor-pointer hover:bg-red-100 hover:shadow-lg active:scale-95 active:bg-red-200'
                >
                  <TrashIcon className='mr-2 h-5 w-5 text-red-600 group-hover:text-red-700' />
                  <span className='group-hover:text-red-700'>Hapus Produk</span>
                </div>
              </div>
              <form onSubmit={handleUpdate} action=''>
                <div className=' grid w-full grid-cols-2'>
                  <label className='col-span-2 mb-4 mr-3 block'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Nama Produk
                    </span>
                    <textarea
                      rows={3}
                      maxLength={150}
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      type='text'
                      className='mt-1 block w-full resize-none rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                    <p className='mt-1 text-right text-xs text-slate-600'>
                      Maksimal 150 karakter
                    </p>
                  </label>

                  <label className='mb-4 mr-3 block'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Brand
                    </span>
                    <input
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      type='text'
                      className='mt-1 block w-full rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                  </label>
                  <label className='mb-4 mr-3 block'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Model
                    </span>
                    <input
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      type='text'
                      className='mt-1 block w-full rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                  </label>
                  <label className='mb-4 mr-3 block'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Serial Number
                    </span>
                    <input
                      value={SerialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      type='text'
                      className='mt-1 block w-full rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                  </label>
                  <label className='mb-4 mr-3 block'>
                    <span className='block text-sm font-medium text-slate-700'>
                      SKU
                    </span>
                    <input
                      value={SKU}
                      onChange={(e) => setSKU(e.target.value)}
                      type='text'
                      className='mt-1 block w-full rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                  </label>
                  <label className='col-span-2 mb-4 mr-3 block'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Spesifikasi
                    </span>
                    <textarea
                      rows={3}
                      maxLength={150}
                      value={specification}
                      onChange={(e) => setSpecification(e.target.value)}
                      type='text'
                      className='mt-1 block w-full resize-none rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                    <p className='mt-1 text-right text-xs text-slate-600'>
                      Maksimal 150 karakter
                    </p>
                  </label>
                </div>
                <div className='mt-2 flex items-start justify-between'>
                  <div className='max-w-sm'>
                    <Switch.Group>
                      <div className='flex items-center'>
                        <Switch.Label className=' mr-12 text-sm font-medium text-slate-700'>
                          Status Produk
                        </Switch.Label>

                        <Switch
                          checked={enabled}
                          onChange={setEnabled}
                          className={`${
                            enabled ? 'bg-emerald-500' : 'bg-gray-300'
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                        <p className='ml-4 text-left text-sm'>
                          {enabled ? (
                            <span className='font-semibold text-slate-700'>
                              Aktif
                            </span>
                          ) : (
                            <span className='font-semibold text-slate-400'>
                              Non-Aktif
                            </span>
                          )}
                        </p>
                      </div>
                    </Switch.Group>

                    <p className='mt-1 rounded-md bg-gray-200 p-2 text-xs font-medium text-slate-600'>
                      Produk Aktif : Tampil saat penjualan <br />
                      Produk non-aktif : Tidak tampil saat penjualan
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      parentRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }}
                    className='mr-3 h-fit self-end rounded-md bg-primary-blue px-4 py-3 font-medium uppercase text-white disabled:cursor-not-allowed disabled:cursor-not-allowed disabled:bg-primary-blue/50 disabled:opacity-50'
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {error && 'error'}
    </div>
  )
}

export default ProductEdit
