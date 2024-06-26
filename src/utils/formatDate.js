export const getCurrentDay = () => {
  const date = new Date()
  const currentDate = date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  const formatDate = currentDate.replaceAll('/', '-')
  const year = formatDate.substring(6, 10)
  const month = formatDate.substring(3, 5)
  const day = formatDate.substring(0, 2)
  return `${year}-${month}-${day}`
}

export const dateFormated = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'long'
  }
  const newDate = new Date(date).toLocaleDateString('es-MX', options)
  return newDate
}
