export const validateDateExpired = ({ days, dateCreated }) => {
  const created = new Date(dateCreated).getTime()
  const daysToMs = days * 24 * 60 * 60 * 1000
  const newDate = created + daysToMs
  return newDate
}

export const validateExpired = ({ days, dateCreated }) => {
  const now = new Date()

  const dateToValidate = validateDateExpired({ days, dateCreated })
  const dateToValidateFormated = new Date(dateToValidate).toDateString()

  if (dateToValidateFormated === now.toDateString()) {
    const result = 'toExpired'
    return result
  }

  const daysResult = dateToValidate - now.getTime()
  if (daysResult > 0) {
    const result = 'valid'
    return result
  }
  const result = 'expired'
  return result
}
