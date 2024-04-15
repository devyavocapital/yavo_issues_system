import useFilter from '../../../hooks/useFilter'

// eslint-disable-next-line react/prop-types
const Filter = ({ name, text }) => {
  const { handleFilter } = useFilter()

  return (
    <div className='flex my-auto'>
      <input
        type='radio'
        id={name}
        name='filter'
        value={name}
        className='w-[20px] h-[20px] mr-2'
        onChange={(e) => handleFilter(e.target.value)}
      />
      <label htmlFor={name}>{text}</label>
    </div>
  )
}

export default Filter
