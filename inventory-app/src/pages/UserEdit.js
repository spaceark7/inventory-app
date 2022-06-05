import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { getUserDetail, updateUserDetail } from '../redux/action/userAction'
import { USER_UPDATE_RESET } from '../redux/constant'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeftIcon } from '@heroicons/react/outline'

const UserEdit = () => {
  const { id } = useParams()
  const parentRef = useRef()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [image_path, setImagepath] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [access_level, setAccessLevel] = useState([])
  const [passwordToggle, setPasswordToggle] = useState(false)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success, loading: loadingUpdate } = userUpdate

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(
      updateUserDetail({
        username,
        email,
        first_name,
        last_name,
        image_path,
        password,
      })
    )
  }

  const handleUpload = async (e) => {
    const image = e.target.files[0]
    setImagepath(URL.createObjectURL(image))

    const formData = new FormData()
    formData.append('image', image)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/uploads', formData, config)
      setImagepath(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  useEffect(() => {
    if (!user || !user.username || success) {
      dispatch({ type: USER_UPDATE_RESET })
      dispatch(getUserDetail('profile'))
    } else {
      setUsername(user.username)
      setEmail(user.email)
      setFirstName(user.first_name)
      setLastName(user.last_name)
      setImagepath(user.image_path)
      setAccessLevel(user.access_level)
    }
  }, [dispatch, success, id, user])

  return (
    <div ref={parentRef}>
      <ToastContainer />
      <Breadcrumb pageName={'Edit Profile'} />
      <div
        className='inline-flex items-center text-sm ml-4 p-2 mt-2 cursor-pointer rounded-md  hover:bg-gray-200'
        onClick={() => {
          navigate('/')
        }}
      >
        <ArrowLeftIcon className='mr-2 w-4 h-4' /> Kembali
      </div>
      {loading ? (
        <div className='py-2 px-4 max-w-screen-lg '>
          <div className='flex flex-row bg-white pt-4 pb-6 pr-8 rounded-lg shadow-md'>
            <div className='profile-image relative rounded-full  h-full py-4 px-6 mt-4 '>
              <div className='h-64 w-64 rounded-full  '>
                <Skeleton className='h-64 w-64 rounded-full' />
              </div>
              <div className='mt-2 text-sm h-20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file: font-medium file:bg-secondary-blue/20 file:text-primary-blue'>
                <Skeleton />
              </div>
            </div>
            <div className='w-full pl-6 py-4'>
              <h2 className='font-bold text-xl max-w-sm text-slate-600 mb-4'>
                <Skeleton />
              </h2>
              <form onSubmit={handleUpdate} action=''>
                <div className='grid grid-cols-2 max-w-lg mb-4'>
                  <Skeleton className='h-12' count={2} />
                </div>
                <div className='mb-8'>
                  <h2 className='font-bold text-xl max-w-sm  text-slate-600 mb-3'>
                    <Skeleton />
                  </h2>
                  <div className='flex flex-row flex-wrap max-w-sm'>
                    {Array.from({ length: 4 }).map((item, index) => (
                      <div
                        key={index}
                        className='py-2 px-4 mr-3 max-w-xs font-semibold text-xs rounded-full'
                      >
                        <Skeleton />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='border-b border-b-slate-300 pb-6'>
                  <h2 className='font-bold text-xl max-w-xs text-slate-600 mb-4'>
                    <Skeleton />
                  </h2>
                  <div className='grid grid-cols-2'>
                    <div className='mb-2 mr-3 max-w-xs'>
                      <Skeleton className='h-10' />
                    </div>

                    <div className='mb-2 mr-3 max-w-xs'>
                      <Skeleton className='h-10' />
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-2 max-w-sm text-sm'>
                    <Skeleton className='h-10' />
                    <span className='text-slate-600'>
                      <Skeleton />
                    </span>
                  </div>
                </div>
                <div className='flex justify-end mt-6 '>
                  <div className='max-w-sm h-24'>
                    <Skeleton />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : error ? (
        'error'
      ) : (
        <div className='py-2 px-4  w-fit '>
          <div className='flex flex-row bg-white pt-4 pb-6 pr-8 rounded-lg shadow-md'>
            <div className='profile-image relative max-w-xs h-full rounded-full py-4 px-6 mt-4 '>
              <img
                className='w-64 h-64 object-cover object-center rounded-full'
                src={image_path}
                alt={`profile of ${username}`}
              />
              {uploading ? (
                'Sedang upload'
              ) : (
                <input
                  type='file'
                  accept='image/*'
                  name='image_upload'
                  id='image_upload'
                  onChange={handleUpload}
                  className='mt-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file: font-medium file:bg-secondary-blue/20 file:text-primary-blue'
                />
              )}
            </div>
            <div className='w-full pl-6 py-4'>
              <h2 className='font-bold text-xl text-slate-600 mb-4'>
                Informasi Detail
              </h2>
              <form onSubmit={handleUpdate} action=''>
                <div className='grid grid-cols-2 max-w-lg mb-4'>
                  <label className='block w-max mb-4 mr-3  '>
                    <span className='block text-sm font-medium text-slate-700'>
                      User Name
                    </span>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type='text'
                      className='mt-1 block w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                  </label>
                  <label className='block w-max mb-4 mr-3'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Alamat Email
                    </span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      className='mt-1 block w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                  </label>
                  <label className='block w-max mb-4 mr-3'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Nama Depan
                    </span>
                    <input
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      type='text'
                      className='mt-1 block w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                  </label>
                  <label className='block w-max mb-4 mr-3'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Nama Belakang
                    </span>
                    <input
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      type='text'
                      className='mt-1 block w-full bg-secondary-blue/10 focus:bg-white px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                    />
                  </label>
                </div>
                <div className='mb-8'>
                  <h2 className='font-bold text-xl text-slate-600 mb-3'>
                    Akses Level
                  </h2>
                  <div className='flex flex-row flex-wrap'>
                    {access_level
                      ? access_level.map((item, index) => (
                          <div
                            key={item.id}
                            className='py-2 px-4 mr-3 bg-primary-blue/5 text-primary-blue font-semibold text-xs rounded-full'
                          >
                            {item.access_type}
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                <div className='border-b border-b-slate-300 pb-6'>
                  <h2 className='font-bold text-xl text-slate-600 mb-4'>
                    Keamanan
                  </h2>
                  <div className='grid grid-cols-2'>
                    <div className='mb-2 mr-3'>
                      <label className='block w-max '>
                        <span className='block text-sm font-medium text-slate-700'>
                          Kata sandi baru
                        </span>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={passwordToggle ? 'text' : 'password'}
                          placeholder='Masukan Kata sandi baru'
                          className='mt-1 block form-input w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                        />
                      </label>
                    </div>

                    <label className='block w-max mb-2'>
                      <span className='block text-sm font-medium text-slate-700'>
                        Konfirmasi kata sandi baru
                      </span>
                      <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={passwordToggle ? 'text' : 'password'}
                        placeholder='Ulang Kata sandi baru'
                        className={
                          password !== confirmPassword
                            ? 'mt-1 block w-full px-3 py-2 peer bg-white border border-pink-500 focus:border-pink-500 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1 focus:ring-pink-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 '
                            : 'mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                        }
                      />
                    </label>
                  </div>
                  {password !== confirmPassword && (
                    <p className='mt-2 text-pink-600 text-sm'>
                      Kata sandi tidak cocok
                    </p>
                  )}
                  <div className='flex justify-between items-center mt-2 w-fit text-sm'>
                    <input
                      type='checkbox'
                      value={passwordToggle}
                      className='form-checkbox rounded text-lg text-primary-blue mr-2'
                      onChange={(e) => setPasswordToggle(e.target.checked)}
                    />
                    <span className='text-slate-600'>Tampilkan sandi</span>
                  </div>
                </div>
                <div className='flex justify-end mt-6'>
                  <button
                    onClick={() => {
                      parentRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }}
                    disabled={password !== confirmPassword}
                    className='bg-primary-blue px-4 py-3 disabled:bg-primary-blue/50 disabled:cursor-not-allowed rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium uppercase'
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {error && 'error'}
    </div>
  )
}

export default UserEdit
