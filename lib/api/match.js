import sendRequest from './sendRequest'

const BASE_PATH = '/api/v1/match'

export const getMatchesList = () =>
  sendRequest(`${BASE_PATH}/get`, {
    method: 'GET',
  })

export const addNewMatch = match =>
  sendRequest(`${BASE_PATH}/add`, {
    body: JSON.stringify(match)
  })
