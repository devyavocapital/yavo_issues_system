import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useSocket from '../../../hooks/useSocket'
import useUser from '../../../hooks/useUser'
import { getCurrentUser } from '../../utils/fetched'
import Notification from '../Notification'
import Spinner from '../common/Spinner'
import Navigation from './Navigation'

const Layout = () => {
  const { user, handleUser } = useUser()
  const { socket } = useSocket()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('yavo_tickets_session')
    if (!token) {
      navigate('/')
      return
    }

    const getUser = async () => {
      let currentUser
      try {
        currentUser = await getCurrentUser(token)
        if (currentUser === undefined) {
          navigate('/')
        }

        currentUser !== null &&
          socket.emit('newUser', {
            user: currentUser,
            socketID: socket.id
          })
      } catch (error) {
        console.log(error)
      } finally {
        handleUser(currentUser)
        setLoading(false)
      }
    }
    user === null && getUser()
  }, [navigate, socket])

  return loading
    ? (
      <main className='h-screen w-full grid mx-auto my-auto'>
        <Spinner />
      </main>)
    : (
      <>
        <header>
          <Navigation />
          {/* Aparece cada que llega una notificacion */}
          <Notification />
        </header>
        <Outlet />
      </>
      )
}

export default Layout
