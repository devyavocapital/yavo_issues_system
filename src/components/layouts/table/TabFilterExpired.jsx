import React from 'react'
import useGlobal from '../../../../hooks/useGlobal'

const TabFilterExpired = () => {
  const { expired, handleExpired } = useGlobal()

  const statusExpired = [
    {
      label: 'Todos',
      value: null,
      colorClasses: 'focus:ring-cyan-600 hover:bg-cyan-600'
    },
    {
      label: 'Vigentes',
      value: 'valid',
      colorClasses: 'focus:ring-green-300 hover:bg-green-300'
    },
    {
      label: 'Por Vencer',
      value: 'toExpired',
      colorClasses: 'focus:ring-yellow-200 hover:bg-yellow-200'
    },
    {
      label: 'Expirados',
      value: 'expired',
      colorClasses: 'focus:ring-red-700 hover:bg-red-700'
    }
  ]

  return (
    <div className='w-11/12 grid justify-end'>
      <ul className='hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex'>
        {statusExpired.map(({ label, value, colorClasses }) => (
          <li key={label}>
            <button
              type='button'
              className={`w-full h-12 p-4 text-gray-900 rounded-l-lg focus:ring-4 focus:outline-none ${colorClasses} 
                        ${expired === value ? 'bg-gray-400' : 'bg-gray-100'}
                        `}
              aria-current='page'
              onClick={() => handleExpired(value)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TabFilterExpired
