import { Navbar } from 'flowbite-react'
import React from 'react'
import useGlobal from '../../../../hooks/useGlobal'
import { statusFilters } from '../../../utils/statusFilters'

const NavbarMenu = () => {
  const { handleFilter, filter } = useGlobal()
  return (
    <Navbar.Collapse>
      {statusFilters.map((status) => (
        <button
          type='button'
          onClick={() => handleFilter(status.name)}
          key={status.name}
          className={`px-5 p-2  rounded-xl  border-2 border-cyan-700 hover:text-black hover:bg-white hover:border-2 hover:border-cyan-700 ${filter === status.name
              ? 'bg-white text-black'
              : 'text-white bg-cyan-700'
            }`}
        >
          {status.text}
        </button>
      ))}
    </Navbar.Collapse>
  )
}

export default NavbarMenu
