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
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { getProductDetail } from '../redux/action/productAction'

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

  useEffect(() => {
    if (!permission) {
      navigate('/unauthorized')
    }
    if (!product || !product.product_name) {
      dispatch(getProductDetail(id))
    } else {
      setProductName(product.product_name)
      setImagepath(product.product_image)
    }
  }, [dispatch, userInfo, navigate, permission, id, product])

  return (
    <div ref={parentRef}>
      <ToastContainer />
      <Breadcrumb pageName={'Edit Profile'} />
      <div
        className='inline-flex items-center text-sm ml-4 p-2 mt-2 cursor-pointer rounded-md  hover:bg-gray-200'
        onClick={() => {
          navigate(-1)
        }}
      >
        <ArrowLeftIcon className='mr-2 w-4 h-4' /> Kembali
      </div>
      {loading ? (
        <div className='py-2 px-4 max-w-screen-lg '>
          <div className='flex flex-row bg-white pt-4 pb-6 pr-8 rounded-lg shadow-md'>
            <div className='profile-image relative rounded-full  h-full py-4 px-6 mt-4 '>
              <div className='h-64 w-64 rounded-full  '>
                <Skeleton className='h-64 w-64 rounded-full' />
              </div>
              <div className='mt-2 text-sm h-20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file: font-medium file:bg-secondary-blue/20 file:text-primary-blue'>
                <Skeleton />
              </div>
            </div>
            <div className='w-full pl-6 py-4'>
              <h2 className='font-bold text-xl max-w-sm text-slate-600 mb-4'>
                <Skeleton />
              </h2>
              <form onSubmit={handleUpdate} action=''>
                <div className='grid grid-cols-2 max-w-lg mb-4'>
                  <Skeleton className='h-12' count={2} />
                </div>
                <div className='mb-8'>
                  <h2 className='font-bold text-xl max-w-sm  text-slate-600 mb-3'>
                    <Skeleton />
                  </h2>
                  <div className='flex flex-row flex-wrap max-w-sm'>
                    {Array.from({ length: 4 }).map((item, index) => (
                      <div
                        key={index}
                        className='py-2 px-4 mr-3 max-w-xs font-semibold text-xs rounded-full'
                      >
                        <Skeleton />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='border-b border-b-slate-300 pb-6'>
                  <h2 className='font-bold text-xl max-w-xs text-slate-600 mb-4'>
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

                  <div className='flex justify-between items-center mt-2 max-w-sm text-sm'>
                    <Skeleton className='h-10' />
                    <span className='text-slate-600'>
                      <Skeleton />
                    </span>
                  </div>
                </div>
                <div className='flex justify-end mt-6 '>
                  <div className='max-w-sm h-24'>
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
        <div className='py-2 px-4 w-full '>
          <div className='flex flex-row bg-white pt-4 pb-6 pr-8 rounded-lg shadow-md'>
            <div className='profile-image relative max-w-xs h-full rounded-full py-4 px-6 mt-4 '>
              <img
                className='w-64 h-64 object-cover object-center rounded-full'
                src={image_path}
                alt={`profile of ${productName}`}
              />

              <input
                type='file'
                accept='image/*'
                name='image_upload'
                onChange={handleUpload}
                id='image_upload'
                className='mt-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file: font-medium file:bg-secondary-blue/20 file:text-primary-blue'
              />
            </div>
            <div className='w-full pl-6 py-4'>
              <h2 className='font-bold text-xl text-slate-600 mb-4'>
                Informasi Detail
              </h2>
              <form onSubmit={handleUpdate} action=''>
                <div className='grid grid-cols-2 w-full mb-4'>
                  <label className='block mb-4 mr-3 col-span-2'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Nama Produk
                    </span>
                    <textarea
                      rows={3}
                      maxLength={150}
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      type='text'
                      className='mt-1 block resize-none w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                    <p className='text-xs mt-1 text-right text-slate-600'>
                      Maksimal 150 karakter
                    </p>
                  </label>

                  <label className='block mb-4 mr-3'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Brand
                    </span>
                    <input
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      type='text'
                      className='mt-1 block w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                  </label>
                  <label className='block mb-4 mr-3'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Model
                    </span>
                    <input
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      type='text'
                      className='mt-1 block w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                  </label>
                  <label className='block mb-4 mr-3'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Serial Number
                    </span>
                    <input
                      value={SerialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      type='text'
                      className='mt-1 block w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                  </label>
                  <label className='block mb-4 mr-3'>
                    <span className='block text-sm font-medium text-slate-700'>
                      SKU
                    </span>
                    <input
                      value={SKU}
                      onChange={(e) => setSKU(e.target.value)}
                      type='email'
                      className='mt-1 block w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                  </label>
                  <label className='block mb-4 mr-3 col-span-2'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Spesifikasi
                    </span>
                    <textarea
                      rows={3}
                      maxLength={150}
                      value={specification}
                      onChange={(e) => setSpecification(e.target.value)}
                      type='text'
                      className='mt-1 block resize-none w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                    <p className='text-xs mt-1 text-right text-slate-600'>
                      Maksimal 150 karakter
                    </p>
                  </label>
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
