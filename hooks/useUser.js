import { useContext } from 'react'
import UserContext from '../contexts/user/UserContext'

const useUser = () => {
  return useContext(UserContext)
}

export default useUser
