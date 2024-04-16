export const formatName = ({ name = '', lastname = '' }) => {
  if (lastname === '' || lastname === undefined) {
    const n = name.slice(0, 1).toUpperCase()
    const fullName = `${n}${name.slice(1, name.length)}`
    return fullName
  }

  if (name === '' && lastname === '') {
    const fullName = ''
    return fullName
  }

  const n = name.slice(0, 1).toUpperCase()
  const l = lastname.slice(0, 1).toUpperCase()

  const fullName = `${n}${name.slice(1, name.length)} ${l}${lastname.slice(1, lastname.length)}`
  return fullName
}
