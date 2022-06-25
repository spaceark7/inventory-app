import NumberFormat from 'react-number-format'
import { PencilAltIcon, XIcon } from '@heroicons/react/outline'

import { Link } from 'react-router-dom'

export default function ProductRow({
  product,
  openModal,

  setProduct,
}) {
  const handleModal = (product) => {
    openModal()
    setProduct(product)
  }
  return (
    <>
      <tr key={product.id}>
        <td className='border-b  px-4 py-4 bg-white text-xs border-slate-400 text-slate-500'>
          <div className='w-64 '>
            <h3 className='font-semibold mb-2'>{product.product_name}</h3>

            <p className='text-xs'>
              SKU : {product.SKU} | SN : {product.product_SN}
            </p>
          </div>
        </td>

        <td className='border-b px-4 py-4 bg-white text-xs max-w-xs border-slate-400 text-slate-500'>
          {product.brand}
        </td>
        <td className='border-b px-4 py-4 bg-white text-xs max-w-xs border-slate-400 text-slate-500'>
          {product.model}
        </td>
        <td className='border-b relative px-4 py-4 bg-white text-xs  border-slate-400 text-slate-500'>
          <div className='group  '>
            <div className='truncate  w-56 items-center'>
              {product.specification}
            </div>
            <span className='w-fit px-2 py-4 no absolute  top-0 hidden group-hover:inline text-xs rounded-md bg-white border border-slate-200 shadow-md'>
              {product.specification}
            </span>
          </div>
        </td>
        <td className='border-b px-4 py-4 bg-white text-xs max-w-xs border-slate-400 text-slate-500'>
          {product.product_type}
        </td>
        <td className='border-b px-4 py-4 bg-white text-xs  border-slate-400 text-slate-500'>
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
        <td className='border-b px-4 py-4 bg-white text-xs  border-slate-400 text-slate-500'>
          {product.status ? 'Aktif' : 'Non-Aktif'}
        </td>
        <td className='border-b px-4 py-4 bg-white text-xs border-slate-400 text-slate-500'>
          <div className='inline-flex items-center'>
            <Link to={`/product-edit/${product.id}`}>
              <div className='p-2 relative rounded-lg hover:bg-primary-blue/20 group transition'>
                <PencilAltIcon className='w-4 h-4 group-hover:text-primary-blue ' />
                <span className='w-fit px-2 absolute -left-1 -bottom-6 hidden group-hover:inline text-sm rounded-md bg-white border border-slate-200 shadow-md'>
                  Edit
                </span>
              </div>
            </Link>
            <div
              onClick={() => handleModal(product)}
              className='p-2 relative rounded-lg hover:bg-red-200 group transition'
            >
              <XIcon className='w-4 h-4 group-hover:text-red-700' />
              <span className='w-fit px-2 absolute -left-2 -bottom-6 hidden group-hover:inline text-xs rounded-md bg-white border border-slate-200 shadow-md'>
                Delete
              </span>
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}
