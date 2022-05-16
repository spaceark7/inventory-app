import React from 'react'

const Breadcrumb = ({ pageName }) => {
  return (
    <div className='sticky top-0 w-full z-10 h-11 px-4 py-2 bg-white font-medium text-slate-700 shadow-md'>
      {pageName}
    </div>
  )
}

export default Breadcrumb
