import React from 'react'
import Breadcrumb from '../components/Breadcrumb'

const WelcomeScreen = () => {
  return (
    <div>
      <Breadcrumb pageName={'Welcome Page'} />
      <div className='px-4'>
        <div className='bg-white mt-4 px-4 border border-slate-200 shadow-sm h-screen min-h-[90vh]'>
          test
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
