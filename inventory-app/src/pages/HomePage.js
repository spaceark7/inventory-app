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
      navigate('/login')
    }
    if (error) {
      dispatch(logout())
    }
  }, [dispatch, navigate, userInfo, error])

  return (
    <div className='flex'>
      <nav className='bg-primary-navy w-56 min-h-screen h-full flex flex-col'>
        <Link to='/'>
          <div className='nav-brand py-4 px-5 h-1/3 pl-6 mb-4 border-b border-white/20'>
            <h2 className='text-white text-2xl mx-auto  font-semibold'>Onix</h2>
            <p className='text-sm text-white'>ERP Solution</p>
          </div>
        </Link>
        <div className='nav-menu w-full min-h-[80vh] flex flex-col justify-between '>
          <div className=''>
            {' '}
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
          <div className='h-1/3'>
            <div className='nav-item text-white px-6 py-2 w-full'>
              <div
                onClick={handleLogout}
                className='inline-flex font-body p-2 rounded-md w-full cursor-pointer hover:bg-white/10'
              >
                <ChartSquareBarIcon className=' h-6 w-6 mr-2' />
                Logout
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className='w-full h-screen overflow-y-auto pb-12'>
        <Routes>
          <Route path='/' element={<WelcomeScreen />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='product' element={<Product />} />
          <Route path='user-edit/:id' element={<UserEdit />} />
          <Route path='sales-order' element={<SalesOrder />} />
        </Routes>
      </div>
    </div>
  )
}

export default HomePage
