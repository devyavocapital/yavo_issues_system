import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSocket from '../../../hooks/useSocket'
import useToken from '../../../hooks/useToken'
import { fetched } from '../../utils/fetched'
import { formatName } from '../../utils/formatName'
import {
  fnGetCategories,
  fnGetIssues,
  fnGetNames
} from '../../utils/getFunctions'
import { statusFilters } from '../../utils/statusFilters'

export default function EditIssue () {
  const navigation = useNavigate()
  const { token } = useToken()
  const { socket } = useSocket()
  const [names, setNames] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [values, setValues] = useState({})
  const [client, setClient] = useState('')
  const id = window.location.pathname.split('/')[3]

  useEffect(() => {
    const getData = async () => {
      try {
        setNames(await fnGetNames(token))
        setCategories(await fnGetCategories(token))

        const issue = await fnGetIssues(token, null, id)

        setClient(
          `${issue.task}`
        )

        setValues({
          task: issue.task,
          nameClient: issue.nameClient === 'null' || issue.nameClient === undefined ? '' : issue.nameClient,
          creditNumber: issue.creditNumber === 'null' || issue.creditNumber === undefined ? '' : issue.creditNumber,
          socialNumber: issue.socialNumber === 'null' || issue.socialNumber === undefined ? '' : issue.socialNumber,
          cardNumber: issue.cardNumber === 'null' || issue.cardNumber === undefined ? '' : issue.cardNumber,
          assignTo: issue.assignTo === 'null' || issue.assignTo === undefined ? '' : issue.assignTo,
          category: issue.category === 'null' || issue.category === undefined ? '' : issue.category,
          lastnameClient: issue.lastnameClient === 'null' || issue.lastnameClient === undefined ? '' : issue.lastnameClient,
          motherLastnameClient: issue.motherLastnameClient === 'null' || issue.motherLastnameClient === undefined ? '' : issue.motherLastnameClient,
          daysConfig: issue.daysConfig === 'null' || issue.daysConfig === undefined ? '' : issue.daysConfig,
          status: issue.status
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  const {
    task,
    nameClient,
    creditNumber,
    socialNumber,
    cardNumber,
    assignTo,
    category,
    lastnameClient,
    motherLastnameClient,
    daysConfig,
    status
  } = values

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPosting(true)

    const data = values
    const dataNotification = {
      userAssignated: data.assignTo,
      originalClient: `${data.nameClient} ${data.lastnameClient} ${data.motherLastnameClient}`,
      category: data.category,
      newNameClient: client
    }

    socket.emit('notification', dataNotification)
    try {
      await fetched(token, `issues?id=${id}`, 'PUT', data)
      await fetched(token, 'notifications/data', 'PUT', dataNotification)
    } catch (error) {
      console.log(error)
    } finally {
      setPosting(false)
    }

    navigation('/dashboard')
  }

  return loading
    ? <Spinner />
    : (
      <form className='grid mx-auto my-10 w-8/12'>
        <div className='space-y-6'>
          <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
            Agregar nuevo ticket
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
              value={task}
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='nameClient'
                value='Nombre del cliente / comercio *'
              />
            </div>
            <TextInput
              id='nameClient'
              name='nameClient'
              placeholder=''
              required
              onChange={(e) => handleChange(e)}
              value={nameClient}
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
              value={lastnameClient}
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
              value={motherLastnameClient}
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
              required
              onChange={(e) => handleChange(e)}
              value={creditNumber}
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
              required
              onChange={(e) => handleChange(e)}
              value={socialNumber}
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
              required
              onChange={(e) => handleChange(e)}
              value={cardNumber}
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='assignTo' value='Asignar a' />
            </div>
            <Select
              id='assignTo'
              name='assignTo'
              required
              onChange={(e) => handleChange(e)}
            >
              <option value={0} name={0}>
                Sin Asignar
              </option>
              {!loading &&
                names.map((name) => (
                  <option
                    key={name._id}
                    value={name._id}
                    selected={assignTo === name._id}
                  >
                    {formatName({ name: name.name, lastname: name.lastname })}
                  </option>
                ))}
            </Select>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='category' value='Categoría' />
            </div>
            <Select
              id='category'
              name='category'
              required
              onChange={(e) => handleChange(e)}
            >
              <option value='' name='' selected={category === 'NULL'} disabled>
                Sin Asignar
              </option>
              {!loading &&
                categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    name={category._id}
                    selected={category}
                  >
                    {category.category}
                  </option>
                ))}
            </Select>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='status' value='Estatus' />
            </div>
            <Select
              id='status'
              name='status'
              required
              onChange={(e) => handleChange(e)}
            >
              {statusFilters.map(
                (s) =>
                  s.name !== 'all' && (
                    <option
                      key={s.name}
                      value={s.name}
                      name={s.name}
                      selected={status === s.name}
                    >
                      {s.text}
                    </option>
                  )
              )}
            </Select>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='daysConfig' value='Número de días a expirar' />
            </div>
            <TextInput
              id='daysConfig'
              name='daysConfig'
              type='number'
              min={0}
              required
              onChange={(e) => handleChange(e)}
              value={daysConfig}
            />
          </div>
          <div className='w-full'>
            <Button onClick={(e) => handleSubmit(e)}>{!posting ? 'Actualizar' : <Spinner />}</Button>
          </div>
        </div>
      </form>
      )
}
