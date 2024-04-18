import useToken from '../../../hooks/useToken'
import { fetched } from '../../utils/fetched'

const IconDelete = ({ id, allNotifications, setAllNotifications, setToDelete }) => {
  const { token } = useToken()

  const handleDelete = async () => {
    const readed = 0
    const active = false
    const data = { id, readed, active }

    await fetched(token, 'notifications', 'PATCH', data)
    // setAllNotifications(allNotifications.filter((n) => n.id !== id && id))
    setToDelete(id)
  }

  return (
    <button type='button' onClick={handleDelete}>
      <svg className='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
        <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
      </svg>
    </button>
  )
}

export default IconDelete
