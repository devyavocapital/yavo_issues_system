import { Navbar } from 'flowbite-react'
import React from 'react'

const NavbarBrand = () => {
  return (
    <Navbar.Brand href='/dashboard'>
      <span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='white'
          className='w-10 h-10 mr-2'
        >
          <title>icon ticket</title>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z'
          />
        </svg>
      </span>
      <span className='self-center whitespace-nowrap text-xl font-semibold text-white'>
        Tickets - YavoCapital
      </span>
    </Navbar.Brand>
  )
}

export default NavbarBrand
