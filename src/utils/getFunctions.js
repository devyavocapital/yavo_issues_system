import { fetched } from './fetched'

export const fnGetNames = async (token) => {
  const response = await fetched(token, 'names', 'GET')
  return response
}

export const fnGetCategories = async (token) => {
  const response = await fetched(token, 'categories', 'GET')
  return response
}

export const fnGetIssues = async (token, nameClient, id) => {
  const response = await fetched(
    token, `issues?nameClient=${nameClient}&id=${id}`, 'GET'
  )
  return response
}

export const fnGetComments = async (token, idIssue) => {
  const response = await fetched(token, `comments?idIssue=${idIssue}`, 'GET')
  return response
}

export const fnGetStats = async (token) => {
  const response = await fetched(token, 'stats', 'GET')
  return {
    stats: response.stats,
    statsByUser: response.statsByUser,
    statsCreated: response.statsCreated,
    statsAssignated: response.statsAssignated
  }
}
