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
import useValidation from '../validHooks'

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
  const [valid, setValid] = useState()

  const dispatch = useDispatch()

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success, loading: loadingUpdate } = userUpdate

  const t = useValidation(password, confirmPassword)

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
    console.log(e.target)
    const formData = new FormData()
    formData.append('image', image)
    console.log(formData)
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
        className='ml-4 mt-2 inline-flex cursor-pointer items-center rounded-md p-2 text-sm  hover:bg-gray-200'
        onClick={() => {
          navigate('/')
        }}
      >
        <ArrowLeftIcon className='mr-2 h-4 w-4' /> Kembali
      </div>
      {loading ? (
        <div className='max-w-screen-lg py-2 px-4 '>
          <div className='flex flex-row rounded-lg bg-white pt-4 pb-6 pr-8 shadow-md'>
            <div className='profile-image relative mt-4  h-full rounded-full py-4 px-6 '>
              <div className='h-64 w-64 rounded-full  '>
                <Skeleton className='h-64 w-64 rounded-full' />
              </div>
              <div className='file: mt-2 h-20 text-sm font-medium file:mr-4 file:rounded-full file:border-0 file:bg-secondary-blue/20 file:py-2 file:px-4 file:text-sm file:text-primary-blue'>
                <Skeleton />
              </div>
            </div>
            <div className='w-full py-4 pl-6'>
              <h2 className='mb-4 max-w-sm text-xl font-bold text-slate-600'>
                <Skeleton />
              </h2>
              <form onSubmit={handleUpdate} action=''>
                <div className='mb-4 grid max-w-lg grid-cols-2'>
                  <Skeleton className='h-12' count={2} />
                </div>
                <div className='mb-8'>
                  <h2 className='mb-3 max-w-sm text-xl  font-bold text-slate-600'>
                    <Skeleton />
                  </h2>
                  <div className='flex max-w-sm flex-row flex-wrap'>
                    {Array.from({ length: 4 }).map((item, index) => (
                      <div
                        key={index}
                        className='mr-3 max-w-xs rounded-full py-2 px-4 text-xs font-semibold'
                      >
                        <Skeleton />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='border-b border-b-slate-300 pb-6'>
                  <h2 className='mb-4 max-w-xs text-xl font-bold text-slate-600'>
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

                  <div className='mt-2 flex max-w-sm items-center justify-between text-sm'>
                    <Skeleton className='h-10' />
                    <span className='text-slate-600'>
                      <Skeleton />
                    </span>
                  </div>
                </div>
                <div className='mt-6 flex justify-end '>
                  <div className='h-24 max-w-sm'>
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
        <div className='w-fit py-2  px-4 '>
          <div className='flex flex-row rounded-lg bg-white pt-4 pb-6 pr-8 shadow-md'>
            <div className='profile-image relative mt-4 h-full max-w-xs rounded-full py-4 px-6 '>
              <img
                className='h-64 w-64 rounded-full object-cover object-center'
                src={image_path}
                alt={`profile of ${username}`}
              />

              <input
                type='file'
                accept='image/*'
                name='image_upload'
                onChange={handleUpload}
                id='image_upload'
                className='file: mt-2 text-sm font-medium file:mr-4 file:rounded-full file:border-0 file:bg-secondary-blue/20 file:py-2 file:px-4 file:text-sm file:text-primary-blue'
              />
            </div>
            <div className='w-full py-4 pl-6'>
              <h2 className='mb-4 text-xl font-bold text-slate-600'>
                Informasi Detail
              </h2>
              <form onSubmit={handleUpdate} action=''>
                <div className='mb-4 grid max-w-lg grid-cols-2'>
                  <label className='mb-4 mr-3 block w-max  '>
                    <span className='block text-sm font-medium text-slate-700'>
                      User Name
                    </span>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type='text'
                      className='mt-1 block w-full rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                  </label>
                  <label className='mb-4 mr-3 block w-max'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Alamat Email
                    </span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      className='mt-1 block w-full rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                  </label>
                  <label className='mb-4 mr-3 block w-max'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Nama Depan
                    </span>
                    <input
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      type='text'
                      className='mt-1 block w-full rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                  </label>
                  <label className='mb-4 mr-3 block w-max'>
                    <span className='block text-sm font-medium text-slate-700'>
                      Nama Belakang
                    </span>
                    <input
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      type='text'
                      className='mt-1 block w-full rounded-md border border-slate-300 bg-secondary-blue/10 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    />
                  </label>
                </div>
                <div className='mb-8'>
                  <h2 className='mb-3 text-xl font-bold text-slate-600'>
                    Akses Level
                  </h2>
                  <div className='flex flex-row flex-wrap'>
                    {access_level
                      ? access_level.map((item, index) => (
                          <div
                            key={item.id}
                            className='mr-3 rounded-full bg-primary-blue/5 py-2 px-4 text-xs font-semibold text-primary-blue'
                          >
                            {item.access_type}
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                <div className='border-b border-b-slate-300 pb-6'>
                  <h2 className='mb-4 text-xl font-bold text-slate-600'>
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
                          className='form-input mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                        />
                      </label>
                    </div>

                    <label className='mb-2 block w-max'>
                      <span className='block text-sm font-medium text-slate-700'>
                        Konfirmasi kata sandi baru
                      </span>
                      <input
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                        }}
                        type={passwordToggle ? 'text' : 'password'}
                        placeholder='Ulang Kata sandi baru'
                        className={
                          valid === false
                            ? 'peer mt-1 block w-full rounded-md border border-pink-500 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600  focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-600 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none '
                            : 'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                        }
                      />
                    </label>
                  </div>
                  {confirmPassword !== password && (
                    <p className='mt-2 text-sm text-pink-600'>
                      Kata sandi tidak cocok
                    </p>
                  )}
                  <div className='mt-2 flex w-fit items-center justify-between text-sm'>
                    <input
                      type='checkbox'
                      value={passwordToggle}
                      className='form-checkbox mr-2 rounded text-lg text-primary-blue'
                      onChange={(e) => setPasswordToggle(e.target.checked)}
                    />
                    <span className='text-slate-600'>Tampilkan sandi</span>
                  </div>
                </div>
                <div className='mt-6 flex justify-end'>
                  <button
                    onClick={() => {
                      parentRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }}
                    disabled={password !== confirmPassword}
                    className='rounded-md bg-primary-blue px-4 py-3 font-medium uppercase text-white disabled:cursor-not-allowed disabled:cursor-not-allowed disabled:bg-primary-blue/50 disabled:opacity-50'
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
