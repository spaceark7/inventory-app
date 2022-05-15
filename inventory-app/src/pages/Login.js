import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let Navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    Navigate('/')
  }
  return (
    <div className='w-full min-h-screen flex bg-white '>
      <div className='w-4/6 bg-primary-navy/80 justify-end flex '>
        <div className='text-white pl-6 mt-28 max-w-sm'>
          <div className='py-6'>
            <h1 className='font-bold text-7xl'>ONIX</h1>
            <p className='font-body ml-2 opacity-80 text-sm'>
              Inventory & Sales Manajemen
            </p>
          </div>
          <h2 className='text-xl font-light'>
            Aplikasi Inventory & Penjualan untuk memudahkan bisnis anda.
          </h2>
          <p className='font-body mt-6 text-sm opacity-90 font-light'>
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
        <div className='max-w-xs px-6 py-8 pb-14 rounded-lg mx-auto my-auto shadow-sm'>
          <h2 className='font-bold text-xl mb-4'>Login</h2>
          <form action='' className='space-y-4' onSubmit={handleSubmit}>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Alamat Email
              </span>
              <input
                type='text'
                className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
              />
            </label>
            <label className='block'>
              <span className='block text-sm font-medium text-slate-700'>
                Kata Sandi
              </span>
              <input
                type='password'
                className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-navy/60 focus:ring-1 focus:ring-primary-navy/70 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
              />
            </label>
            <button className='block w-full rounded-md bg-primary-blue uppercase text-white font-body font-medium tracking-wide px-4 py-2 text-center hover:bg-primary-blue/95'>
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
