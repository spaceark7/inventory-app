import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import { ChartSquareBarIcon } from '@heroicons/react/outline'
import Product from './Product'
import SalesOrder from './SalesOrder'
import WelcomeScreen from './WelcomeScreen'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/action/userAction'
import UserEdit from './UserEdit'
import ProductEdit from './ProductEdit'
import Unauthorized from './Unauthorized'
import CreateProduct from './CreateProduct'

const HomePage = () => {
  const dispatch = useDispatch()
  // const userLogin = useSelector((state) => state.userLogin)
  // const {userInfo} = userLogin
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
  }

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/Login')
    }
    if (error) {
      dispatch(logout())
    }
  }, [dispatch, navigate, userInfo, error])

  return (
    <div className='flex'>
      <nav className='flex h-full min-h-screen w-56 flex-col bg-primary-navy'>
        <Link to='/'>
          <div className='nav-brand mb-4 h-1/3 border-b border-white/20 py-4 px-5 pl-6'>
            <h2 className='mx-auto text-2xl font-semibold  text-white'>Onix</h2>
            <p className='text-sm text-white'>ERP Solution</p>
          </div>
        </Link>
        <div className='nav-menu flex min-h-[80vh] w-full flex-col justify-between '>
          <div className=''>
            {' '}
            <div className='nav-item w-full px-6 py-2 text-white'>
              <Link to='/dashboard'>
                <div className='inline-flex w-full cursor-pointer rounded-md   p-2 font-body hover:bg-white/10'>
                  <ChartSquareBarIcon className=' mr-2 h-6 w-6' />
                  Dashboard
                </div>
              </Link>
            </div>
            <div className='nav-item w-full px-6 py-2 text-white'>
              <Link to={'/product'}>
                <div className='inline-flex w-full cursor-pointer rounded-md   p-2 font-body hover:bg-white/10'>
                  <ChartSquareBarIcon className=' mr-2 h-6 w-6' />
                  Produk
                </div>
              </Link>
            </div>
            <div className='nav-item w-full px-6 py-2 text-white'>
              <Link to={'/sales-order'}>
                <div className='inline-flex w-full cursor-pointer rounded-md   p-2 font-body hover:bg-white/10'>
                  <ChartSquareBarIcon className=' mr-2 h-6 w-6' />
                  Penjualan
                </div>
              </Link>
            </div>
          </div>
          <div className='h-1/3'>
            <div className='nav-item w-full px-6 py-2 text-white'>
              <div
                onClick={handleLogout}
                className='inline-flex w-full cursor-pointer rounded-md p-2 font-body hover:bg-white/10'
              >
                <ChartSquareBarIcon className=' mr-2 h-6 w-6' />
                Logout
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className='scrollbar max-h-screen w-full overflow-y-auto '>
        <Routes>
          <Route path='/' element={<WelcomeScreen />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='product' element={<Product />} />
          <Route path='create-product' element={<CreateProduct />} />
          <Route path='user-edit/:id' element={<UserEdit />} />
          <Route path='product-edit/:id' element={<ProductEdit />} />
          <Route path='sales-order' element={<SalesOrder />} />
          <Route path='unauthorized' element={<Unauthorized />} />
        </Routes>
      </div>
    </div>
  )
}

export default HomePage
