import { Button } from 'flowbite-react'
import React from 'react'
import useGlobal from '../../../hooks/useGlobal'

const ModuleReport = ({ excelData }) => {
  const { filter } = useGlobal()

  const exportsExcel = async () => {
    const XLSX = await import(
      'https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs'
    )
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DATA')
    XLSX.writeFile(workbook, `${filter}.xlsx`)
  }

  return (
    <div>
      <Button
        type='button'
        gradientDuoTone='cyanToBlue'
        pill
        onClick={() => exportsExcel()}
      >
        Descargar reporte
      </Button>
    </div>
  )
}

export default ModuleReport
