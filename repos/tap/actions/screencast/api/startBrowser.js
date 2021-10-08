import { dispatch, getStore } from 'SVStore'
import { devLog } from 'SVUtils'
import { Values } from 'SVConstants'
import { addToast } from 'SVActions/toasts'
import { noOpObj, get } from '@keg-hub/jsutils'
import { apiRequest } from 'SVUtils/api/apiRequest'

const { HttpMethods, CATEGORIES } = Values

export const startBrowser = async (options=noOpObj) => {

  const { items } = getStore()?.getState()
  if(!items)
    return console.warn(`No items set in the store`)
  
  const storeOpts = items[CATEGORIES.BROWSER_OPTIONS]

  addToast({
    type: 'info',
    message: `Starting screencast...`
  })

  const resp = await apiRequest({
    url: '/screencast/browser/start',
    method: HttpMethods.GET,
    params: {...storeOpts, ...options},
  }, 'object')
  
  console.log(`---------- resp ----------`)
  console.log(resp)
  
  // error &&
  //   error.message &&
  //   addToast({
  //     type: 'danger',
  //     message: error.message
  //   })

}