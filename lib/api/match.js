import sendRequest from './sendRequest'

const BASE_PATH = '/api/v1/match'

export const getMatchesList = (offset = 0, limit = 20, withCount = false) => 
  sendRequest(`${BASE_PATH}/get/${offset}/${limit}/${withCount}`, {
    method: 'GET'
  })

export const getMatchBySlug = slug =>
  sendRequest(`${BASE_PATH}/get/${slug}`, {
    method: 'GET'
  })

export const addNewMatch = match =>
  sendRequest(`${BASE_PATH}/add`, {
    body: JSON.stringify(match)
  })
