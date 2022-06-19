import React from 'react'

const ErrorScreen = ({ error }) => {
  return (
    <div className='w-full h-[80vh]'>
      <div className='relative w-fit mx-auto'>
        <img
          className='max-h-[50vh] mx-auto mt-24'
          src='/images/3d_female.webp'
          alt=''
        />
        <div className='text-center'>
          <h1 className=' text-4xl font-bold'>{error}</h1>
          <p className='max-w-md mt-3'>
            Silahkan muat ulang halaman. JIka masih terjadi masalah cek koneksi
            internet anda.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorScreen
