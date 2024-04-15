import { useState } from 'react'
import useToken from '../../../../hooks/useToken'
import { fetched } from '../../../utils/fetched'
import { esStatus } from '../../../utils/statusFilters'

const TableDescription = ({
  status,
  creditNumber,
  nameAssignated,
  expired,
  issueId
}) => {
  const { token } = useToken()
  const [isSelectable, setIsSelectable] = useState(false)
  const [newStatusBD, setNewStatusBD] = useState('')

  const handleStatus = async ({ id, newStatus }) => {
    const data = { id, status: newStatus }
    try {
      await fetched(token, 'issues', 'PATCH', data)
    } catch (error) {
      console.log(error)
    } finally {
      setNewStatusBD(newStatus)
    }
  }

  return (
    <div className='flex md:gap-2 lg:gap-5'>
      <button onClick={() => setIsSelectable(!isSelectable)} className='relative'>
        <span
          className={`relative rounded-xl p-2 text-sm md:text-md lg:text-lg font-bold border-2 bg-slate-900
                      ${(status === 'Pendiente' || esStatus(newStatusBD) === 'Pendiente') && 'text-[#FFF508]'}
                      ${(status === 'Finalizado' || esStatus(newStatusBD) === 'Finalizado') && 'text-[#00BB07]'}
                      ${(status === 'Por Atender' || esStatus(newStatusBD) === 'Por Atender') && 'text-[#FF0707]'}
                      ${(status === 'nonStatus' || esStatus(newStatusBD) === 'nonStatus') && 'text-[#9B9B9B]'}
                  `}
        >
          {newStatusBD !== '' ? (esStatus(newStatusBD)) : status}
          <span
            className={`absolute rounded-full w-5 h-5 -top-2 -right-2 border-2 border-black 
              ${expired === 'valid' && 'bg-green-400'}
              ${expired === 'toExpired' && 'bg-yellow-200'}
              ${expired === 'expired' && 'bg-red-700'}
              ${expired === null && 'bg-slate-100'}`}
          />
        </span>
        {isSelectable && (
          <ul className='w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg absolute z-40'>
            <li className='w-full px-4 py-2 border-b border-gray-200 hover:bg-gray-300' onClick={() => handleStatus({ id: issueId, newStatus: 'pendient' })}>Pendiente</li>
            <li className='w-full px-4 py-2 border-b border-gray-200 hover:bg-gray-300' onClick={() => handleStatus({ id: issueId, newStatus: 'finished' })}>Finalizado</li>
            <li className='w-full px-4 py-2 border-b border-gray-200 hover:bg-gray-300' onClick={() => handleStatus({ id: issueId, newStatus: 'attending' })}>Por Atender</li>
          </ul>
        )}
      </button>
      {creditNumber && (
        <p classNameName='text-gray-800 font-bold place-self-center italic text-sm md:text-md lg:text-lg lg:flex hidden'>
          #Crédito: {creditNumber}
        </p>
      )}
      <div className='flex'>
        <p className='text-gray-900 place-self-center text-sm md:text-md lg:text-lg'>
          <span className='font-bold'>Asignado a:</span> {nameAssignated}
        </p>
      </div>
    </div>
  )
}

export default TableDescription
