import { socketConfig } from '../../../configs/socket.config'
import { isFunc } from '@keg-hub/jsutils'

class Events {
  constructor(instance){
    Object.entries(this)
      .map(([key, value]) => (
        isFunc(value) && (instance.events[key] = value.bind(instance))
      ))
  }

  // all = (message, instance, event) => {}
  // connect = (message, instance) => {}
  // init = (message) => {}

}

class SocketService {
  constructor(config){
    Object.assign(this, { events: {} }, config)
    new Events(this)
  }
}

export const WSService = new SocketService(socketConfig)