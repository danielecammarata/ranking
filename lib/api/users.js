import sendRequest from './sendRequest'

const BASE_PATH = '/api/v1/users'

export const getUsersList = () =>
  sendRequest(`${BASE_PATH}/get`, {
    method: 'GET',
  })

export const addNewUser = user =>
  sendRequest(`${BASE_PATH}/add`, {
    body: JSON.stringify(user)
  })
