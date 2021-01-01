import { Messenger } from './messenger.js'
import { createIframe } from './createIframe.js'
import { deepMerge, uuid } from '@keg-hub/jsutils'
import { toggle } from './toggle'

const defConfig = {
  iframe: {
    // ID of iframe. If not passed, will auto-create the iframe,
    id: `keg-messenger-iframe`,
    class: `keg-messenger-iframe ${uuid()}`,
    // URL to set the Iframe too, overrides the default Keg-Herkin bundle
    // TODO: update this to be the bundled keg-herkin client code as data url
    src: `http://herkin-master.local.kegdev.xyz/`,
    // Extra attributes to add to the iframe 
    attrs: {
      frameborder: "0",
      allowfullscreen: true,
    },
  },
  toggle: {
    speed: 1000,
    side: 'right',
    type: 'linear'
  }
}

export class MessengerParent {

  isOpen=true

  constructor(config={}){
    this.config = deepMerge(defConfig, config)
    this.container = createIframe(this.config, this.toggle)
  }

  toggle = () => {
    this.isOpen = toggle(this.isOpen, this.container, this.config)
  }

}
