import React from 'react'

const Breadcrumb = ({ pageName }) => {
  return (
    <div className='sticky top-0 w-full h-11 px-4 py-2 bg-white font-medium text-slate-700 shadow-sm'>
      {pageName}
    </div>
  )
}

export default Breadcrumb
