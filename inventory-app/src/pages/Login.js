import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/action/userAction'

import { DotsHorizontalIcon } from '@heroicons/react/outline'

const Login = () => {
  let Navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      Navigate(redirect)
    }
  }, [userInfo, Navigate, loading, redirect])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className='flex min-h-screen w-full bg-white '>
      <div className='flex w-4/6 justify-end bg-primary-navy/80 '>
        <div className='mt-28 max-w-sm pl-6 text-white'>
          <div className='py-6'>
            <h1 className='text-7xl font-bold'>ONIX</h1>
            <p className='ml-2 font-body text-sm opacity-80'>
              Inventory & Sales Manajemen
            </p>
          </div>
          <h2 className='text-xl font-light'>
            Aplikasi Inventory & Penjualan untuk memudahkan bisnis anda.
          </h2>
          <p className='mt-6 font-body text-sm font-light opacity-90'>
            Kontrol keluar masuk barang anda dan mencatat semua penjualan dengan
            laporan pintar.
          </p>
        </div>
        <div className='relative my-auto h-screen overflow-hidden'>
          <img
            className='w-full'
            src='/images/login_character.png'
            alt='Login character 3d'
          />
        </div>
      </div>
      <div className='w-2/6 py-28'>
        <div className='mx-auto my-auto max-w-xs rounded-lg px-6 py-8 pb-14 shadow-sm'>
          <h2 className='mb-4 text-xl font-bold'>Login</h2>
          <form action='' className='space-y-4' onSubmit={handleSubmit}>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Alamat Email
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                className='mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
              />
            </label>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Kata Sandi
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                className='mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary-navy/60 focus:outline-none focus:ring-1 focus:ring-primary-navy/70 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
              />
            </label>
            {error ? (
              <p className='my-2 rounded-sm bg-danger/20 px-2 py-1 font-body text-sm font-medium text-red-800'>
                {error}
              </p>
            ) : null}

            <button
              disabled={loading}
              className={
                'block w-full rounded-md bg-primary-blue px-4 py-2 text-center font-body font-medium uppercase tracking-wide text-white hover:bg-primary-blue/95 disabled:cursor-wait disabled:bg-primary-blue/60'
              }
            >
              {loading ? (
                <div className='inline-flex animate-pulse items-center'>
                  <DotsHorizontalIcon className='mr-2 h-4 w-4 ' />
                  <p>Loading</p>
                </div>
              ) : (
                'Masuk'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
