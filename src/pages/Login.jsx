import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useToken from '../../hooks/useToken'
import Spinner from '../components/common/Spinner'
import { fetched, getCurrentUser } from '../utils/fetched'

const Login = () => {
  const emailRef = useRef()
  const passRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const navigation = useNavigate()
  const { handleToken } = useToken()

  useEffect(() => {
    const isLogged = async () => {
      try {
        const localToken = localStorage.getItem('yavo_tickets_session')
        if (!localToken) {
          return
        }

        handleToken(localToken)

        const user = await getCurrentUser(localToken)
        if (!user) {
          localStorage.removeItem('yavo_tickets_session')
          return
        }
        navigation('/dashboard')
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    isLogged()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (emailRef.current.value === '') {
      setError('El email es obligatorio')
      setLoading(true)
      return null
    }
    if (passRef.current.value === '') {
      setError('El password es obligatorio')
      setLoading(true)
      return null
    }

    // consultar la api
    const data = {
      email: emailRef.current.value,
      password: passRef.current.value
    }
    const response = await fetched('', 'login', 'POST', data)
    setLoading(false)
    if (response?.error) {
      setError(response.error)
      return
    }

    setError('')
    localStorage.setItem('yavo_tickets_session', response.token)
    handleToken(response.token)
    navigation('/dashboard')
  }

  return loading
    // && <main className='h-screen w-full grid mx-auto my-auto'>
    //   <Spinner />
    // </main>
    ? (
      <main className='h-screen w-full grid mx-auto my-auto'>
        <Spinner />
      </main>)
    : (
      <div className='h-screen grid place-content-center '>
        <form className='flex w-[500px] flex-col gap-4' onSubmit={handleLogin}>
          <h1 className='text-5xl'>Iniciar Sesión</h1>
          <p className='italic text-red-600'>{error}</p>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='email1' value='Email' />
            </div>
            <TextInput
              id='email1'
              placeholder='name@yavocapital.com'
              required
              type='email'
              ref={emailRef}
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='password1' value='Password' />
            </div>
            <TextInput id='password1' required type='password' ref={passRef} />
          </div>
          <Button type='submit' className='uppercase'>
            {loading ? <Spinner /> : 'Iniciar sesión'}
          </Button>
        </form>
      </div>
      )
}

export default Login
