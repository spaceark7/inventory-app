import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../components/Breadcrumb'
import { listProducts } from '../redux/action/productAction'
import NumberFormat from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, PencilAltIcon, XIcon } from '@heroicons/react/outline'

const Product = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <Breadcrumb className='z-20' pageName={'Products Page'} />
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
          <div className='relative rounded-xl bg-gray-50 bg-opacity-75 border border-slate shadow-sm'>
            <div className='max-h-[80vh] mt-4 pb-8 bg-gray-50 bg-opacity-75 overflow-auto scrollbar'>
              <table className='table-auto w-full border-collapse text-sm px-4'>
                <thead className='z-10'>
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
                      <tr key={product.id}>
                        <td className='border-b  px-4 py-2 bg-white text-xs border-slate-400 text-slate-500'>
                          <div className='w-64 '>
                            <h3 className='font-semibold mb-2'>
                              {product.product_name}
                            </h3>

                            <p className='text-xs'>
                              SKU : {product.SKU} | SN : {product.product_SN}
                            </p>
                          </div>
                        </td>

                        <td className='border-b px-4 py-2 bg-white text-xs max-w-xs border-slate-400 text-slate-500'>
                          {product.brand}
                        </td>
                        <td className='border-b px-4 py-2 bg-white text-xs max-w-xs border-slate-400 text-slate-500'>
                          {product.model}
                        </td>
                        <td className='border-b relative px-4 py-2 bg-white text-xs  border-slate-400 text-slate-500'>
                          <div className='group  '>
                            <div className='truncate  w-56 items-center'>
                              {product.specification}
                            </div>
                            <span className='w-fit px-2 py-2 no absolute  top-0 hidden group-hover:inline text-xs rounded-md bg-white border border-slate-200 shadow-md'>
                              {product.specification}
                            </span>
                          </div>
                        </td>
                        <td className='border-b px-4 py-2 bg-white text-xs max-w-xs border-slate-400 text-slate-500'>
                          {product.product_type}
                        </td>
                        <td className='border-b px-4 py-2 bg-white text-xs  border-slate-400 text-slate-500'>
                          <div>
                            <NumberFormat
                              className='block'
                              value={product.price}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'Rp.'}
                            />
                          </div>
                        </td>
                        <td className='border-b px-4 py-2 bg-white text-xs  border-slate-400 text-slate-500'>
                          {product.status ? 'Aktif' : 'Non-Aktif'}
                        </td>
                        <td className='border-b px-4 py-2 bg-white text-xs border-slate-400 text-slate-500'>
                          <div className='inline-flex items-center'>
                            <div className='p-2 relative rounded-lg hover:bg-primary-blue/20 group transition'>
                              <PencilAltIcon className='w-4 h-4 group-hover:text-primary-blue ' />
                              <span className='w-fit px-2 absolute -left-1 -bottom-6 hidden group-hover:inline text-sm rounded-md bg-white border border-slate-200 shadow-md'>
                                Edit
                              </span>
                            </div>
                            <div className='p-2 relative rounded-lg hover:bg-red-200 group transition'>
                              <XIcon className='w-4 h-4 group-hover:text-red-700' />
                              <span className='w-fit px-2 absolute -left-2 -bottom-6 hidden group-hover:inline text-xs rounded-md bg-white border border-slate-200 shadow-md'>
                                Delete
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
