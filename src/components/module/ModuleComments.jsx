import React, { useState } from 'react'
import { dateFormated } from '../../utils/formatDate'
import { formatName } from '../../utils/formatName'
import { esStatus } from '../../utils/statusFilters'
import ModalComment from './modals/ModalComment'

const ModuleComments = ({
  comments,
  handleComments,
  issueSelected,
  newComment
}) => {
  const [changeStatus, setChangeStatus] = useState(null)

  return (
    <div className='fixed z-20 right-0 top-0 w-full h-screen bg-slate-800 bg-opacity-80'>
      <div className='fixed w-3/4 lg:w-1/2 bg-cyan-700 right-0 h-screen opacity-100 bg-opacity-100 flex justify-between flex-col animate-fade-left animate-once animate-ease-out'>
        <div>
          <button
            type='button'
            onClick={() => handleComments(0)}
            className='absolute p-3 m-3 border-2 border-cyan-700 hover:bg-white hover:rounded-xl'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <title>icon Close</title>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
          <h2 className='text-white text-center text-3xl lg:text-5xl my-2'>
            {formatName({ name: issueSelected.task, lastname: '' })}
          </h2>
          <p className='font-bold italic text-xl text-center my-0 py-0'>
            {changeStatus !== null ? esStatus(changeStatus.status) : esStatus(issueSelected.status)}
          </p>
          <h3 className='text-white text-center text-2xl my-2'>
            Folio: {issueSelected._id}
          </h3>

          {changeStatus !== null
            ? (
              <p className='text-white text-center text-xl my-2'>
                Asignado a:{' '}
                <span className='font-bold text-2xl'>{changeStatus.assignTo}</span>
              </p>
              )
            : issueSelected.nameAssignated === null ||
              issueSelected.nameAssignated === undefined
              ? (
                <p className='text-white text-center text-xl my-2'>
                  No ha sido asignado
                </p>
                )
              : (
                <p className='text-white text-center text-xl my-2'>
                  Asignado a:{' '}
                  <span className='font-bold text-2xl'>
                    {issueSelected.nameAssignated}
                  </span>
                </p>
                )}
        </div>
        <ul className='divide-y divide-gray-200 overflow-y-auto h-[700px]'>
          {comments?.map((comment) => {
            return (
              <li className='py-3 sm:py-4 px-5 mx-2 mb-2' key={comment.description}>
                <div className='flex items-center space-x-4'>
                  <div className='shrink-0'>
                    <img
                      alt='User settings'
                      src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                      className='w-[50px] h-[50px] rounded-full'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className=' text-xl font-medium text-gray-200 '>
                      {!comment.nombreCompleto
                        ? formatName({
                          name: comment?.user[0]?.name,
                          lastname: comment?.user[0]?.lastname
                        })
                        : comment.nombreCompleto}
                      : <span>{comment.description}</span>
                      <br />
                      <span className='inline-flex items-center text-base font-semibold text-gray-900 '>
                        Creado: {dateFormated(comment.created_At)}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className='grid w-4/12 mt-5 mb-3 mx-auto'>
          <ModalComment
            id={issueSelected}
            newComment={newComment}
            setChangeStatus={setChangeStatus}
          />
        </div>
      </div>
    </div>
  )
}

export default ModuleComments
