import { createContext, useRef, useState } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const searchingRef = useRef()
  const [filter, setFilter] = useState('all')
  const [expired, setExpired] = useState(null)
  const [newIssue, setNewIssue] = useState({})
  const [search, setSearch] = useState(false)

  const handleFilter = (value) => {
    setFilter(value)
    setExpired(null)
  }

  const handleNewIssue = (issue) => {
    setNewIssue(issue)
  }

  const handleExpired = (value) => {
    setExpired(value)
  }

  const handleSearch = () => {
    setSearch(!search)
  }

  return (
    <GlobalContext.Provider
      value={{
			  filter,
			  handleFilter,
			  newIssue,
			  handleNewIssue,
			  expired,
			  handleExpired,
			  searchingRef,
			  search,
			  handleSearch
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalProvider }

export default GlobalContext
