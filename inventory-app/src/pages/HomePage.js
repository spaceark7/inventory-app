import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import { ChartSquareBarIcon } from '@heroicons/react/outline'
import Product from './Product'
import SalesOrder from './SalesOrder'

const HomePage = () => {
  return (
    <div className='flex'>
      <nav className='bg-primary-navy w-56 min-h-screen h-full'>
        <div className='nav-brand py-4 px-5 pl-6 mb-4 border-b border-white/20'>
          <h2 className='text-white text-2xl mx-auto  font-semibold'>Onix</h2>
          <p className='text-sm text-white'>ERP Inventory Solution</p>
        </div>
        <div className='nav-menu w-full'>
          <div className='nav-item text-white px-6 py-2 w-full'>
            <Link to='/dashboard'>
              <div className='inline-flex font-body p-2 rounded-md   w-full cursor-pointer hover:bg-white/10'>
                <ChartSquareBarIcon className=' h-6 w-6 mr-2' />
                Dashboard
              </div>
            </Link>
          </div>
          <div className='nav-item text-white px-6 py-2 w-full'>
            <Link to={'/product'}>
              <div className='inline-flex font-body p-2 rounded-md   w-full cursor-pointer hover:bg-white/10'>
                <ChartSquareBarIcon className=' h-6 w-6 mr-2' />
                Produk
              </div>
            </Link>
          </div>
          <div className='nav-item text-white px-6 py-2 w-full'>
            <Link to={'/sales-order'}>
              <div className='inline-flex font-body p-2 rounded-md   w-full cursor-pointer hover:bg-white/10'>
                <ChartSquareBarIcon className=' h-6 w-6 mr-2' />
                Penjualan
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <div className='w-full h-screen'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='product' element={<Product />} />
          <Route path='sales-order' element={<SalesOrder />} />
        </Routes>
      </div>
    </div>
  )
}

export default HomePage
