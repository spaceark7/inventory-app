import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div className='w-full'>
      <div className='w-fit mx-auto flex items-center justify-center'>
        <div className='w-1/2 h-screen flex items-center'>
          <img
            className='w-5/6 mx-auto'
            src='/images/3d_not_authorized.webp'
            alt='3d illustration confused'
          />
        </div>

        <div className='w-1/2 h-screen '>
          <div className='py-60'>
            <h1 className=' text-5xl font-bold mb-2'>Oops!</h1>
            <h3 className='text-xl font-medium w-5/6 mb-6 text-slate-700'>
              Sepertinya anda tidak diperbolehkan mengakses halaman ini.
            </h3>
            <Link to='/'>
              <div className='py-2 px-4 w-fit rounded-lg text-blue-50 bg-primary-blue/90 hover:bg-primary-blue'>
                Kembali ke halaman utama
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
