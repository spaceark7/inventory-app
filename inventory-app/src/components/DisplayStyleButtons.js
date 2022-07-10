import { ViewGridIcon, ViewListIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

const DisplayStyleButtons = ({ changeViewToGrid, changeViewToList }) => {
  const [style, setStyle] = useState('list')
  useEffect(() => {
    const getViewStyle = () => {
      const viewStyle = localStorage.getItem('viewStyle')
      if (viewStyle) {
        setStyle(JSON.parse(viewStyle))
      }
    }
    getViewStyle()
  }, [])
  return (
    <div className='flex items-center space-x-1'>
      <span className='text-xs text-slate-400'>Tampilan</span>
      <div className='grid grid-cols-2 divide-x rounded-md border border-slate-200 text-sm font-semibold text-slate-600'>
        <button
          onClick={() => {
            setStyle('list')
            changeViewToList()
          }}
          className={`${
            style === 'list' && 'bg-slate-200 font-semibold'
          } btn icon flex items-center  transition duration-200 ease-out active:scale-95 active:bg-slate-300`}
        >
          <div>
            <ViewListIcon className='mr-2 h-4 w-4' />
          </div>
          <span>List</span>
        </button>
        <button
          onClick={() => {
            setStyle('grid')
            changeViewToGrid()
          }}
          className={`${
            style === 'grid' && 'bg-slate-200 font-semibold'
          } btn icon flex items-center  transition duration-200 ease-out active:scale-95 active:bg-slate-300`}
        >
          <div>
            <ViewGridIcon className='mr-2 h-4 w-4' />
          </div>
          <span>Grid</span>
        </button>
      </div>
    </div>
  )
}

export default DisplayStyleButtons
