import { Dropdown, Navbar } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../../../hooks/useUser'
import { formatName } from '../../../utils/formatName'

const NavbarUser = ({ handleSignOut }) => {
  const { user } = useUser()
  return (
    <>
      <img
        alt='User settings'
        src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
        className='w-[35px] h-[35px] rounded-full'
      />
      <Dropdown inline>
        <Dropdown.Header>
          <span className='block text-sm'>{`${formatName({ name: user.name, lastname: user.lastname })}`}</span>
          <span className='block truncate text-sm font-medium'>
            {user.email}
          </span>
        </Dropdown.Header>
        {user.category === 1 && (
          <div className='grid gap-2 mb-2'>
            <Link to='/crear-usuario' className='ml-4 hover:text-cyan-600'>
              Crear Usuario
            </Link>
            <Link to='/crear-categoria' className='ml-4 hover:text-cyan-600'>
              Crear Categoría
            </Link>
          </div>
        )}
        <Dropdown.Divider />
        <div className='grid gap-2 mb-2'>
          <Link
            to='/dashboard/estadisticas'
            className='ml-4 hover:text-cyan-600'
          >
            Estadistica
          </Link>
        </div>
        <div className='flex justify-center'>
          <button
            className='flex justify-center'
            type='button'
            onClick={handleSignOut}
          >
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <title>Icon down</title>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                />
              </svg>
            </span>
            <p>Sign out</p>
          </button>
        </div>
      </Dropdown>
      <Navbar.Toggle />
    </>
  )
}

export default NavbarUser
