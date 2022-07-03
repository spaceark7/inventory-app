import React from 'react'

const ErrorScreen = ({ error }) => {
  console.log(error)
  return (
    <div className='h-[80vh] w-full'>
      <div className='relative mx-auto my-auto max-h-[80vh] w-fit'>
        <div className='relative mx-auto w-56 '>
          <img className='object-contain' src='/images/3d_female.webp' alt='' />
        </div>

        <div className='text-center'>
          <h1 className=' text-4xl font-bold'>
            {error ? error : error.data.toString()}
          </h1>
          <p className='mt-3 max-w-md'>
            Silahkan muat ulang halaman. JIka masih terjadi masalah cek koneksi
            internet anda.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorScreen
