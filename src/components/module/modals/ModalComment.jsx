import {
  Button,
  Label,
  Modal,
  Select,
  Spinner,
  Textarea
} from 'flowbite-react'
import { useState } from 'react'
import useSocket from '../../../../hooks/useSocket'
import useToken from '../../../../hooks/useToken'
import useUser from '../../../../hooks/useUser'
import { fetched } from '../../../utils/fetched'
import { formatName } from '../../../utils/formatName'
import { fnGetNames } from '../../../utils/getFunctions'
import { statusFilters } from '../../../utils/statusFilters'

export default function ModalComment ({ id, newComment, setChangeStatus }) {
  const { user } = useUser()
  const { token } = useToken()
  const { socket } = useSocket()
  const [openModal, setOpenModal] = useState('')
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState()
  // const [inputFile, setInputFile] = useState({ file: [] })
  const [userAssignated, setUserAssignated] = useState('')
  const [nameAssignated, setNameAssignated] = useState('')
  const [loadingSpinner, setLoadingSpinner] = useState(false)

  const getNames = async () => {
    if (user.category !== 1) {
      return
    }
    const response = await fnGetNames(token)
    setNames(response)

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  // const handleFile = (e) => {
  //   setInputFile({
  //     file: e.target.files[0]
  //   })
  // }

  const handleChange = (e) => {
    if (e.target.name === 'assignTo' && user.category === 1) {
      if (user.category === 1) {
        const name = e.target.value.split(',')
        setNameAssignated(formatName({ name: name[1], lastname: name[2] }))
        setUserAssignated(name[0])
      }
      if (user.category !== 1) {
        setNameAssignated(null)
        setUserAssignated(null)
      }
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingSpinner(true)

    // const formData = new FormData()
    // formData.append('file', inputFile.file)

    // const images = await fetchedImages(
    //   token,
    //   'images/uploads',
    //   'POST',
    //   formData
    // )

    const data = {
      ...values,
      idIssue: id._id,
      // fileName: inputFile.file.name,
      assignTo: userAssignated,
      nameAssignated
    }

    const dataNotification = {
      nameClient: id.nameClient,
      assignTo: data.assignTo,
      issue: data.idIssue
    }

    try {
      if (data.assignTo !== undefined) {
        socket.emit('notification', dataNotification)
        await fetched(token, 'notifications', 'POST', dataNotification)
      }
      await fetched(token, 'comments', 'POST', data)
      setChangeStatus({ status: data.status, assignTo: nameAssignated })
      setOpenModal('')

      const date = new Date()
      const ms = date.getTime()

      newComment({
        ...values,
        nombreCompleto: nameAssignated,
        created_At: ms,
        description: values.description,
        nameAssignated
        // fileName: !inputFile.file.name ? null : inputFile.file.name
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingSpinner(false)
    }
  }

  return (
    <>
      <Button
        className='bg-white text-black '
        onClick={() => {
          getNames()
          setOpenModal('form-elements')
        }}
      >
        Agregar comentario
      </Button>
      <Modal
        show={openModal === 'form-elements'}
        size='md'
        popup
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-3xl font-medium text-gray-900 dark:text-white'>
              Agregar comentario
            </h3>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='description' value='Descripción' />
              </div>
              <Textarea
                id='description'
                placeholder=''
                required
                name='description'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='max-w-md flex' id='select'>
              <div className='my-auto'>
                <Label
                  htmlFor='status'
                  value='Cambiar estatus:'
                  className='text-xl mr-2'
                />
              </div>
              <Select
                id='status'
                name='status'
                required
                onChange={(e) => handleChange(e)}
              >
                <option value={0} name={0} selected>
                  Sin Asignar
                </option>
                {statusFilters.map(
                  (status) =>
                    status.name !== 'all' && (
                      <option key={status.name} value={status.name}>
                        {status.text}
                      </option>
                    )
                )}
              </Select>
            </div>
            {(user.category === 1 || user._id === id.userId) && (
              <div className='max-w-lg flex' id='select'>
                <div className='my-auto'>
                  <Label
                    htmlFor='assignTo'
                    value='Reasignar a: '
                    className='text-xl mr-2'
                  />
                </div>
                <Select
                  id='assignTo'
                  name='assignTo'
                  required
                  onChange={(e) => handleChange(e)}
                >
                  <option value={0} name={0} selected>
                    Sin Asignar
                  </option>
                  {!loading &&
                    names.map((name) => (
                      <option
                        key={name._id}
                        value={[name._id, name.name, name.lastname]}
                        name={name._id}
                      >
                        {formatName({
                          name: name.name,
                          lastname: name.lastname
                        })}
                      </option>
                    ))}
                </Select>
              </div>
            )}
            {/* <div className='max-w-lg grid' id='select'>
              <div className='my-auto'>
                <Label
                  htmlFor='evidence'
                  value='Evidencia: '
                  className='text-xl mr-2'
                />
              </div>
              <input
                type='file'
                id='evidence'
                name='evidence'
                className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
                onChange={(e) => handleFile(e)}
              />
            </div> */}
            <div className='w-full flex'>
              <Button onClick={(e) => handleSubmit(e)}>
                {loadingSpinner ? <Spinner /> : 'Agregar'}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
