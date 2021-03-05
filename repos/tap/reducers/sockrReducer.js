import { EventTypes } from 'SVUtils/sockr'

export const sockrReducer = (state, action) => {

  switch(action.type){
    case EventTypes.SET_CMDS: {
      return action.commands
        ? { ...state, commands: action.commands }
        : state
    }
    case EventTypes.ON_MESSAGE: {
      break
    }
  }

  return state
}