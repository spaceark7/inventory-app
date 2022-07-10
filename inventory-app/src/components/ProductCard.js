import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product-edit/${product.id}`}>
      <div
        key={product.id}
        className='h-full rounded-xl border border-slate-200 bg-white p-4 shadow-md transition duration-150 ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-xl'
      >
        <div className='relative h-full w-full rounded-xl'>
          <img
            className='aspect-square max-h-40 w-full object-contain'
            src={product.product_image}
            alt={product.product_name}
          />

          <h3 className='mt-2 text-sm font-medium line-clamp-2'>
            {product.product_name}
          </h3>
          <div className='mt-2 space-y-5 text-sm font-semibold text-slate-700'>
            <h3>
              {product.brand} - {product.model}
            </h3>
            <NumberFormat
              className='block'
              value={product.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp.'}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
