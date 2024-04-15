import ModuleReport from './ModuleReport'
import ModalForm from './modals/ModalForm'
/* eslint-disable react/prop-types */

const ModuleControl = ({ data }) => {
  return (
    <div className='w-11/12 mx-auto my-auto flex justify-between'>
      <ModalForm />

      {/* <ModuleFilters /> */}
      <ModuleReport excelData={data} />
    </div>
  )
}

export default ModuleControl
