import { WSService } from 'SVServices'

export const emitEvent = (event, data) => {
  WSService.emit(event, data)
}