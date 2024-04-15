import { Label, Select } from 'flowbite-react'
import useFilter from '../../../hooks/useFilter'
import { statusFilters } from '../../utils/statusFilters'

const ModuleFilters = () => {
  const { handleFilter } = useFilter()

  return (
    <div className='flex my-auto gap-5'>
      <div className='max-w-md flex' id='select'>
        <div className='my-auto'>
          <Label htmlFor='status' value='Estatus:' className='text-xl mr-2' />
        </div>
        <Select
          id='status'
          required
          onChange={(e) => handleFilter(e.target.value)}
        >
          {statusFilters.map((status) => (
            <option value={status.name} name={status.name} key={status.name}>
              {status.text}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default ModuleFilters
