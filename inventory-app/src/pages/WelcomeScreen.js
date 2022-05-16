import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { getUserDetail } from '../redux/action/userAction'
import Clock from 'react-live-clock'
import { PresentationChartLineIcon } from '@heroicons/react/outline'

const WelcomeScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname.split('/')
  const [timezone, setTimeZone] = useState('')
  const dispatch = useDispatch()
  const [access, setAccess] = useState([])
  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const date = new Date().toLocaleString()

  useEffect(() => {
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone

    setTimeZone(tz)
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.first_name) {
        dispatch(getUserDetail('profile'))
      } else {
        setAccess(user.access_level)
        console.log(user)
      }
    }
  }, [dispatch, navigate, userInfo, user])

  return (
    <div>
      {loading ? (
        'loading'
      ) : error ? (
        'error'
      ) : user ? (
        <>
          <Breadcrumb pageName={'Welcome Page'} />
          <div className='px-4'>
            <div className='grid grid-rows-2 mt-4  py-4  h-screen min-h-[90vh]'>
              <div className='user-banner'>
                <div className='w-2/3 bg-gradient-to-r w-full from-primary-blue to-secondary-blue text-white rounded-md px-6 pt-6 flex shadow-lg'>
                  <div className='w-1/2 pt-4'>
                    <h2 className='text-5xl font-body'>
                      Halo,{' '}
                      <span className='font-medium'>{user.first_name}</span>
                    </h2>
                    <div className='mt-4 text-white/80 text-sm'>
                      <Moment
                        element={'div'}
                        local
                        format='ddd, DD/MM/YYYY'
                        locale='id'
                        date={date}
                      />
                      <Clock format='HH:mm:ss' ticking timezone={timezone} />
                    </div>
                    <div className='mt-4 text-white/80  w-fit py-2'>
                      <h2 className='text-sm'>Akses Level Anda :</h2>
                      <div className='space-x-2 mt-1'>
                        {access &&
                          access.map((item) => (
                            <span
                              key={item.id}
                              className='px-2 py-1 font-medium rounded-sm text-sm font-body bg-white/10'
                            >
                              {item.access_type}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2 h-full relative'>
                    <img
                      className=' h-full'
                      src='/images/welcome_character.png'
                      alt='welcome 3d illustration'
                    />
                  </div>
                </div>
                <div className='w-1/3'></div>
              </div>
              <div className='progress-info justify-start flex flex-wrap  '>
                <div className='bg-white shadow-md h-fit mb-4 mr-4 px-4 py-3 rounded-lg'>
                  <div className='flex justify-between items-center border-b pb-2 border-b-slate-300 mb-2'>
                    <h4 className='text-slate-600 font-semibold'>
                      Inventory Insight
                    </h4>
                    <PresentationChartLineIcon className='h-5 w-5 text-secondary-blue' />
                  </div>
                  <div className='flex flex-row justify-around py-4'>
                    {' '}
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='bg-white shadow-md h-fit mb-4  mr-4   px-4 py-3 rounded-lg'>
                  <div className='flex justify-between items-center border-b pb-2 border-b-slate-300 mb-2'>
                    <h4 className='text-slate-600 font-semibold'>
                      Order Insight
                    </h4>
                    <PresentationChartLineIcon className='h-5 w-5 text-secondary-blue' />
                  </div>
                  <div className='flex flex-row justify-around py-4'>
                    {' '}
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='bg-white shadow-md h-fit mb-4 mr-4  px-4 py-3 rounded-lg'>
                  <div className='flex justify-between items-center border-b pb-2 border-b-slate-300 mb-2'>
                    <h4 className='text-slate-600 font-semibold'>
                      Sales Insight
                    </h4>
                    <PresentationChartLineIcon className='h-5 w-5 text-secondary-blue' />
                  </div>
                  <div className='flex flex-row justify-around py-4'>
                    {' '}
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='bg-white shadow-md h-fit mb-4  mr-4  px-4 py-3 rounded-lg'>
                  <div className='flex justify-between items-center border-b pb-2 border-b-slate-300 mb-2'>
                    <h4 className='text-slate-600 font-semibold'>
                      Sales Insight
                    </h4>
                    <PresentationChartLineIcon className='h-5 w-5 text-secondary-blue' />
                  </div>
                  <div className='flex flex-row justify-around py-4'>
                    {' '}
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='bg-white shadow-md h-fit  mb-4 mr-4  px-4 py-3 rounded-lg'>
                  <div className='flex justify-between items-center border-b pb-2 border-b-slate-300 mb-2'>
                    <h4 className='text-slate-600 font-semibold'>
                      Sales Insight
                    </h4>
                    <PresentationChartLineIcon className='h-5 w-5 text-secondary-blue' />
                  </div>
                  <div className='flex flex-row justify-around py-4'>
                    {' '}
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                    <div className='detail-card w-fit p-2 border border-slate-400 rounded-md '>
                      <h5 className='text-slate-600 text-sm mb-1'>
                        Total Produk
                      </h5>
                      <h1 className='text-4xl text-center text-primary-blue font-semibold'>
                        50
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default WelcomeScreen
