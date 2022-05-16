import React from 'react'
import { PresentationChartLineIcon } from '@heroicons/react/outline'

const InsightCard = () => {
  return (
    <div className='bg-white shadow-md h-fit mb-4 mr-4 px-4 py-3 rounded-lg'>
      <div className='flex justify-between items-center border-b pb-2 border-b-slate-300 mb-2'>
        <h4 className='text-slate-600 font-semibold'>Inventory Insight</h4>
        <PresentationChartLineIcon className='h-5 w-5 text-secondary-blue' />
      </div>
      <div className='flex flex-wrap  justify-around py-4'>
        {' '}
        <div className='detail-card w-fit mr-2 mb-2 p-2 border border-slate-400 rounded-md '>
          <h5 className='text-slate-600 text-sm mb-1'>Total Produk</h5>
          <h1 className='text-4xl text-center text-primary-blue font-semibold'>
            50
          </h1>
        </div>
        <div className='detail-card w-fit mr-2 mb-2 p-2 border border-slate-400 rounded-md '>
          <h5 className='text-slate-600 text-sm mb-1'>Total Produk</h5>
          <h1 className='text-4xl text-center text-primary-blue font-semibold'>
            50
          </h1>
        </div>
        <div className='detail-card w-fit mr-2 mb-2 p-2 border border-slate-400 rounded-md '>
          <h5 className='text-slate-600 text-sm mb-1'>Total Produk</h5>
          <h1 className='text-4xl text-center text-primary-blue font-semibold'>
            50
          </h1>
        </div>
      </div>
    </div>
  )
}

export default InsightCard
