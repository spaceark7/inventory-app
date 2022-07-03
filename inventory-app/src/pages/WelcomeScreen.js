import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { getUserDetail } from '../redux/action/userAction'
import Clock from 'react-live-clock'
import { PencilAltIcon } from '@heroicons/react/outline'
import InsightCard from '../components/InsightCard'

const WelcomeScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [timezone, setTimeZone] = useState('')
  const [access, setAccess] = useState([])

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const date = new Date().toISOString()

  useEffect(() => {
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimeZone(tz)
    console.log('from detail:', error)
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.username || error) {
        dispatch(getUserDetail('profile'))
      } else {
        setAccess(user.access_level)
      }
    }
  }, [dispatch, navigate, userInfo, user, error])

  return (
    <div className=''>
      {loading ? (
        'loading'
      ) : error ? (
        'error'
      ) : user ? (
        <>
          <Breadcrumb pageName={'Welcome Page'} />
          <div className='px-4'>
            <div className='mt-4 grid grid-flow-row auto-rows-min space-y-4 py-4'>
              <div className='user-banner flex h-min flex-row items-stretch'>
                <div className='flex w-2/3 w-full rounded-md bg-gradient-to-r from-primary-blue to-secondary-blue px-6 pt-6  text-white shadow-lg'>
                  <div className='w-1/2 pt-2 pb-6'>
                    <h2 className='font-body text-5xl'>
                      Halo,{' '}
                      <span className='font-medium'>{user.first_name}</span>
                    </h2>
                    <Link to={`/user-edit/${user.id}`}>
                      <div className='mt-2  inline-flex w-max cursor-pointer items-center rounded-md bg-slate-100 py-1 px-2 text-xs font-semibold text-primary-blue hover:text-sky-700 hover:shadow-lg'>
                        <span className='mr-1'>Edit profile </span>{' '}
                        <span>
                          <PencilAltIcon className='h-4 w-4' />
                        </span>
                      </div>
                    </Link>
                    <div className='mt-4 text-sm text-white/80'>
                      <Moment
                        element={'div'}
                        local
                        format='ddd, DD MMM YYYY'
                        locale='id'
                        date={date}
                      />
                      <Clock format='HH:mm:ss' ticking timezone={timezone} />
                    </div>
                    <div className='mt-2 w-fit  py-2 text-white/80'>
                      <h2 className='text-sm'>Akses Level Anda :</h2>
                      <div className='mt-1 space-x-2'>
                        {access &&
                          access.map((item) => (
                            <span
                              key={item.id}
                              className='rounded-sm bg-white/10 px-2 py-1 font-body text-sm font-medium'
                            >
                              {item.access_type}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className='relative flex w-1/2 items-end'>
                    <img
                      className='w-full object-bottom'
                      src='/images/welcome_character.png'
                      alt='welcome 3d illustration'
                    />
                  </div>
                </div>
                <div className='ml-4 w-1/3 rounded-md bg-white px-4 py-4 shadow-md'>
                  <h3 className='mb-6 border-b border-b-slate-200 pb-3 font-semibold text-primary-blue'>
                    Quick Menu
                  </h3>
                  <span className='mr-2 w-fit rounded-md border border-primary-blue border-opacity-60 px-4 py-2 font-body text-primary-blue'>
                    Buat Penjualan
                  </span>
                  <span className='w-fit rounded-md border border-primary-blue border-opacity-60 px-4 py-2 font-body text-primary-blue'>
                    Lihat Stock
                  </span>
                </div>
              </div>
              <div className='progress-info flex h-min flex-wrap justify-start'>
                <InsightCard />
                <InsightCard />
                <InsightCard />
                <InsightCard />
                <InsightCard />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default WelcomeScreen
