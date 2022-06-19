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
            <div className='grid grid-flow-row space-y-4 mt-4 py-4 auto-rows-min'>
              <div className='user-banner h-min flex flex-row items-stretch'>
                <div className='w-2/3 bg-gradient-to-r w-full from-primary-blue to-secondary-blue text-white rounded-md px-6 pt-6 flex shadow-lg'>
                  <div className='w-1/2 pt-2'>
                    <h2 className='text-5xl font-body'>
                      Halo,{' '}
                      <span className='font-medium'>{user.first_name}</span>
                    </h2>
                    <Link to={`/user-edit/${user.id}`}>
                      <div className='bg-slate-100  inline-flex items-center text-primary-blue text-xs font-semibold rounded-md w-max py-1 px-2 mt-2 hover:shadow-lg cursor-pointer hover:text-sky-700'>
                        <span className='mr-1'>Edit profile </span>{' '}
                        <span>
                          <PencilAltIcon className='h-4 w-4' />
                        </span>
                      </div>
                    </Link>
                    <div className='mt-4 text-white/80 text-sm'>
                      <Moment
                        element={'div'}
                        local
                        format='ddd, DD MMM YYYY'
                        locale='id'
                        date={date}
                      />
                      <Clock format='HH:mm:ss' ticking timezone={timezone} />
                    </div>
                    <div className='mt-2 text-white/80  w-fit py-2'>
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
                  <div className='w-1/2 relative flex items-end'>
                    <img
                      className='object-bottom w-full'
                      src='/images/welcome_character.png'
                      alt='welcome 3d illustration'
                    />
                  </div>
                </div>
                <div className='w-1/3 ml-4 bg-white rounded-md shadow-md px-4 py-4'>
                  <h3 className='font-semibold text-primary-blue pb-3 border-b border-b-slate-200 mb-6'>
                    Quick Menu
                  </h3>
                  <span className='px-4 font-body py-2 mr-2 border rounded-md border-primary-blue border-opacity-60 w-fit text-primary-blue'>
                    Buat Penjualan
                  </span>
                  <span className='px-4 font-body py-2 border rounded-md border-primary-blue border-opacity-60 w-fit text-primary-blue'>
                    Lihat Stock
                  </span>
                </div>
              </div>
              <div className='progress-info justify-start flex flex-wrap h-min'>
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
