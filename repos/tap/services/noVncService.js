import RFB from "@novnc/novnc/core/rfb"
import { noOpObj } from '@keg-hub/jsutils'
import KeyTable from "@novnc/novnc/core/input/keysym"

const noUpdate = (instance, element, url, creds) => {
  return instance.element === element &&
    instance.url === url &&
    instance.creds === creds
}

export class NoVncService {
  element = null
  url = null
  creds = noOpObj
  isConnected = null

  onConnect(evt) {
    this.isConnected = true
  }
  
  onDisconnect() {
    this.isConnected = false
  }

  onCopy() {
  
  }

  onKeyDown(){
  
  }

  connect(){
    if (!this.element || !this.url || this.connected) return

    const rfb = new RFB(this.element, this.url, {
      credentials: { ...this.creds },
      wsProtocols: ['binary', 'base64'],
    })

    this._rfb = rfb
    // rfb.scaleViewport = true
    rfb.addEventListener("connect", this.onConnect)
    rfb.addEventListener("disconnect", this.onDisconnect)
    rfb.addEventListener("clipboard", this.onCopy)
    // rfb._canvas.addEventListener("keydown", this.onKeyDown, true)

  }

  init(element, url, creds){
    if(noUpdate(this, element, url, creds)) return

    element && (this.element = element)
    url && (this.url = url)
    creds && (this.creds = creds)

    return this.connect()
  }

  disconnect(){
    this.onDisconnect()
  }
}
