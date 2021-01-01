import { connectToChild } from 'penpal'

export class Messenger {
  
  iframe = null
  methods = {}
  
  constructor(iframe, methods={}){
    this.iframe = iframe
    this.methods = methods
  }

  connect = () => {
    if(!this.iframe)
      return console.error(`Messenger.connect requires an iframe element to connect to.`)

    const connection = connectToChild({
      iframe: this.iframe,
      methods: this.methods,
    })

    connection.promise.then((child) => {
      console.log(`---------- child ----------`)
      console.log(child)
      console.log(`---------- this ----------`)
      console.log(this)
    })

  }

}


