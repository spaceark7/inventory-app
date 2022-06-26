import NumberFormat from 'react-number-format'
import { PencilAltIcon, XIcon } from '@heroicons/react/outline'

import { Link } from 'react-router-dom'

export default function ProductRow({ product, openModal, setProduct }) {
  const handleModal = (product) => {
    openModal()
    setProduct(product)
  }
  return (
    <>
      <tr key={product.id}>
        <td className='border-b  border-slate-400 bg-white px-4 py-4 text-xs text-slate-500'>
          <div className='w-64 '>
            <h3 className='mb-2 font-semibold'>{product.product_name}</h3>

            <p className='text-xs'>
              SKU : {product.SKU} | SN : {product.product_SN}
            </p>
          </div>
        </td>

        <td className='max-w-xs border-b border-slate-400 bg-white px-4 py-4 text-xs text-slate-500'>
          {product.brand}
        </td>
        <td className='max-w-xs border-b border-slate-400 bg-white px-4 py-4 text-xs text-slate-500'>
          {product.model}
        </td>
        <td className='relative border-b border-slate-400 bg-white px-4 py-4  text-xs text-slate-500'>
          <div className='group  '>
            <div className='w-56  items-center truncate'>
              {product.specification}
            </div>
            <span className='absolute top-0 hidden  w-fit  transform rounded-md border border-slate-200 bg-white px-2 py-4 text-xs opacity-0 shadow-md transition ease-out group-hover:inline group-hover:opacity-100'>
              {product.specification}
            </span>
          </div>
        </td>
        <td className='max-w-xs border-b border-slate-400 bg-white px-4 py-4 text-xs text-slate-500'>
          {product.product_type}
        </td>
        <td className='border-b border-slate-400 bg-white px-4 py-4  text-xs text-slate-500'>
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
        <td className='w-fit border-b border-slate-400 bg-white px-2 py-4  text-center text-xs text-slate-500'>
          {product.status ? (
            <span className='rounded-full bg-emerald-100 py-1 px-2 text-xs text-emerald-600'>
              Aktif
            </span>
          ) : (
            <span className='w-fit rounded-full bg-red-100 py-1 px-2 text-xs text-red-600'>
              Nonaktif
            </span>
          )}
        </td>
        <td className='border-b border-slate-400 bg-white px-4 py-4 text-xs text-slate-500'>
          <div className='inline-flex items-center'>
            <Link to={`/product-edit/${product.id}`}>
              <div className='group relative rounded-lg p-2 transition hover:bg-primary-blue/20'>
                <PencilAltIcon className='h-4 w-4 group-hover:text-primary-blue ' />
                <span className='absolute -left-1 -bottom-6 hidden w-fit rounded-md border border-slate-200 bg-white px-2 text-sm shadow-md group-hover:inline'>
                  Edit
                </span>
              </div>
            </Link>
            <div
              onClick={() => handleModal(product)}
              className='group relative rounded-lg p-2 transition hover:bg-red-200'
            >
              <XIcon className='h-4 w-4 group-hover:text-red-700' />
              <span className='absolute -left-2 -bottom-6 hidden w-fit rounded-md border border-slate-200 bg-white px-2 text-xs shadow-md group-hover:inline'>
                Delete
              </span>
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}
