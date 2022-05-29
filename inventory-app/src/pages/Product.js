import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../components/Breadcrumb'
import { listProducts } from '../redux/action/productAction'

const Product = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <Breadcrumb pageName={'Products Page'} />
      <div className='py-4 px-4 w-full'>
        <div className='bg-white min-h-screen pt-4 pb-6 px-8 rounded-lg shadow-md'>
          <div className='relative rounded-xl overflow-auto border border-slate'>
            <div className='shadow-sm my-8'>
              <table className='table-auto w-full border-collapse text-sm'>
                <thead>
                  <tr>
                    <th className='border-b border-slate-400 text-slate-500'>
                      Nama Produk
                    </th>
                    <th className='border-b border-slate-400 text-slate-500'>
                      Spesifikasi
                    </th>
                    <th className='border-b border-slate-400 text-slate-500'>
                      Harga
                    </th>
                    <th className='border-b border-slate-400 text-slate-500'>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products &&
                    products.map((product) => (
                      <tr key={product.id}>
                        <td className='border-b border-slate-400 text-slate-500'>
                          {product.product_name}
                        </td>
                        <td className='border-b border-slate-400 text-slate-500'>
                          {product.specification}
                        </td>
                        <td className='border-b border-slate-400 text-slate-500'>
                          {product.price}
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
