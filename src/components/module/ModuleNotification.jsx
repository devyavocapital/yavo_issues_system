import { useEffect, useState } from 'react'
import useSocket from '../../../hooks/useSocket'
import useToken from '../../../hooks/useToken'
import useUser from '../../../hooks/useUser'
import { fetched } from '../../utils/fetched'
import NotificationRow from '../common/NotificationRow'

const ModuleNotification = () => {
  const { user } = useUser()
  const { socket } = useSocket()
  const { token } = useToken()
  const [notification, setNotification] = useState()
  const [myOwn, setMyOwn] = useState(false)
  const [allNotifications, setAllNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [panel, setPanel] = useState(false)

  useEffect(() => {
    socket.on('notificationResponse', (data) => setNotification(data))
  }, [socket])

  useEffect(() => {
    if (notification !== undefined && notification.assignTo === user._id) { setMyOwn(true) }
    if (notification === undefined) setMyOwn(false)
  }, [notification])

  const showPanel = () => {
    setPanel(!panel)
    !panel && handleNotification()
  }

  const handleNotification = async () => {
    setLoading(true)
    const notifications = await fetched(token, 'notifications', 'GET')

    setAllNotifications(notifications)
    setLoading(false)
  }
  return (
    <div className='grid mx-5'>
      <button type='button' onClick={showPanel}>
        {myOwn
          ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='white'
              className='w-6 h-6'
            >
              <title>icon bell</title>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5'
              />
            </svg>
            )
          : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='white'
              className='w-6 h-6'
            >
              <title>icon bell</title>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
              />
            </svg>
            )}
      </button>
      {loading
        ? (
          <div className='w-[400px] h-auto bg-white border-slate-400 border-[1px] absolute top-[50px] right-[0px] rounded-xl z-10'>
            <NotificationRow
              loading={loading}
            />
          </div>
          )
        : (
            panel && (
              <div className='w-[400px] h-auto bg-white border-slate-400 border-[1px] absolute top-[50px] right-[0px] rounded-xl z-10'>
                {allNotifications.length > 0
                  ? (
                      allNotifications.map(
                        (n) =>
                          n.active && (
                            <NotificationRow
                              key={n._id}
                              notification={n}
                              setAllNotifications={setAllNotifications}
                              allNotifications={allNotifications}
                            />
                          )
                      )
                    )
                  : (
                    <div className='w-full p-2 flex justify-between'>
                      <p>No tiene notificaciones </p>
                      <button onClick={showPanel}>
                        <svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                          <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
                        </svg>
                      </button>
                    </div>
                    )}
              </div>
            )
          )}
    </div>
  )
}

export default ModuleNotification
