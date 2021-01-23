import './styles/style.css'
import './styles/bootstrap.min.css'
import { MessengerParent } from '../../messenger'

const initializeMessengerParent = event => {
  new MessengerParent({
    iframe: {
      src: process.env.HERKIN_URL
    }
  })
}

initializeMessengerParent()
