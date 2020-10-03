import { apiRequest } from 'SVUtils/apiRequest'
import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'


export const init = async () => {
  const testData = await apiRequest(`/testData`)
  console.log(testData)
}