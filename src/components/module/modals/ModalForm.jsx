import {
  Button,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput
} from 'flowbite-react'
import { useState } from 'react'
import useGlobal from '../../../../hooks/useGlobal'
import useSocket from '../../../../hooks/useSocket'
import useToken from '../../../../hooks/useToken'
import useUser from '../../../../hooks/useUser'
import { fetched } from '../../../utils/fetched'
import { formatName } from '../../../utils/formatName'
import { fnGetCategories, fnGetNames } from '../../../utils/getFunctions'
import { statusFilters } from '../../../utils/statusFilters'

export default function ModalForm () {
  const { token } = useToken()
  const { socket } = useSocket()
  const { user } = useUser()
  const { handleNewIssue } = useGlobal()

  const [openModal, setOpenModal] = useState('')
  const [names, setNames] = useState()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [values, setValues] = useState()
  const [assignated, setAssignated] = useState({})
  const [error, setError] = useState(null)

  const getNames = async () => {
    const responseCat = await fnGetCategories(token)
    setCategories(responseCat)
    if (user.category === 1) {
      const response = await fnGetNames(token)
      setNames(response)
    }

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const handleChange = (e) => {
    if (e.target.name === 'assignTo') {
      const dataAssignated = e.target.value
      const user = dataAssignated.split(',')
      setAssignated({ name: user[0], id: user[1] })
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPosting(true)

    const data = {
      ...values,
      assignTo: assignated.id === undefined ? user._id : assignated.id,
      nameAssignated: assignated.name
    }

    const dataNotification = {
      task: data.task,
      assignTo: data?.assignTo === undefined ? user._id : data.assignTo,
      category: data.category
    }

    const response = await fetched(token, 'issues', 'POST', data)
    if (response?.task) {
      setError(response.task.message)
    }

    socket.emit('notification', dataNotification)
    await fetched(token, 'notifications', 'POST', dataNotification)
    setPosting(false)

    handleNewIssue({
      _id: response.issueAdded._id,
      task: values.task,
      creditNumber: values.creditNumber,
      nameClient: values.nameClient,
      status: values.status,
      daysConfig: response.issueAdded.daysConfig,
      created_At: response.issueAdded.created_At,
      nameAssignated: assignated.name
    })
    setOpenModal('')
  }

  return (
    <>
      <Button
        gradientDuoTone='cyanToBlue'
        pill
        onClick={() => {
          getNames()
          setOpenModal('form-elements')
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5 mr-2'
        >
          <title>add task</title>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        Nueva Tarea
      </Button>
      <Modal
        show={openModal === 'form-elements'}
        size='md'
        popup
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <form className='space-y-6' onSubmit={(e) => handleSubmit(e)}>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
              Agregar nueva tarea
            </h3>
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='task'
                  value='Tarea *'
                />
              </div>
              <TextInput
                id='task'
                name='task'
                placeholder=''
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='nameClient'
                  value='Nombre del cliente / comercio'
                />
              </div>
              <TextInput
                id='nameClient'
                name='nameClient'
                placeholder=''
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='lastnameClient'
                  value='Apellido paterno del cliente'
                />
              </div>
              <TextInput
                id='lastnameClient'
                name='lastnameClient'
                placeholder=''
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='motherLastnameClient'
                  value='Apellido materno del cliente'
                />
              </div>
              <TextInput
                id='motherLastnameClient'
                name='motherLastnameClient'
                placeholder=''
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='creditNumber' value='Número de crédito' />
              </div>
              <TextInput
                id='creditNumber'
                name='creditNumber'
                type='text'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='socialNumber' value='Número de seguro social' />
              </div>
              <TextInput
                id='socialNumber'
                name='socialNumber'
                type='text'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='cardNumber' value='Número de tarjeta' />
              </div>
              <TextInput
                id='cardNumber'
                name='cardNumber'
                type='text'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='assignTo' value='Asignar a' />
              </div>
              {user.category === 1
                ? (
                  <Select
                    id='assignTo'
                    name='assignTo'
                    onChange={(e) => handleChange(e)}
                    defaultValue={0}
                  >
                    <option value={0}>
                      Sin Asignar
                    </option>
                    {!loading &&
                      names.map(({ _id, name, lastname }) => (
                        <option
                          key={_id}
                          value={[formatName({ name, lastname }), _id]}
                        >
                          {formatName({ name, lastname })}
                        </option>
                      ))}
                  </Select>
                  )
                : (
                  <Select
                    id='assignTo'
                    name='assignTo'
                    onChange={(e) => handleChange(e)}
                    defaultValue={[formatName({ name: user.name, lastname: user.lastname }), user._id]}
                  >
                    <option value={[formatName({ name: user.name, lastname: user.lastname }), user._id]} disabled>
                      {formatName({ name: user.name, lastname: user.lastname })}
                    </option>
                  </Select>
                  )}
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='category' value='Categoría' />
              </div>
              <Select
                id='category'
                name='category'
                onChange={(e) => handleChange(e)}
                defaultValue=''
              >
                <option value=''>
                  Sin Asignar
                </option>
                {!loading &&
                  categories.map(({ _id, nameCategory }) => (
                    <option key={_id} value={_id} name={_id}>
                      {nameCategory}
                    </option>
                  ))}
              </Select>
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='status' value='Estatus *' />
              </div>
              <Select
                id='status'
                name='status'
                required
                onChange={(e) => handleChange(e)}
                defaultValue=''
              >
                <option value='' disabled>
                  Sin Status
                </option>
                {statusFilters.map(
                  (status) =>
                    status.name !== 'all' && (
                      <option
                        key={status.name}
                        value={status.name}
                        name={status.name}
                      >
                        {status.text}
                      </option>
                    )
                )}
              </Select>
            </div>
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='daysConfig'
                  value='Número de días a expirar *'
                />
              </div>
              <TextInput
                id='daysConfig'
                name='daysConfig'
                type='number'
                min={1}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            {error !== null && <p className='italic text-red-600'>{error}</p>}
            <div className='w-full'>
              <Button type='submit' className='w-full'>{posting ? <Spinner /> : 'Agregar'}</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
