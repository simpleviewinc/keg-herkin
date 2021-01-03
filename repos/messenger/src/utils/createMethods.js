
const addToGlobal = (type, name, method) => {
  const winTop = window.top
  winTop.__MESSENGER__ = winTop.__MESSENGER__ || {}
  winTop.__MESSENGER__[type] = winTop.__MESSENGER__[type] || {}
  winTop.__MESSENGER__[type][name] = method
}

const bindMethods = (MessengerInstance, methods) => {
  return Object.entries(methods)
    .reduce((bound, [ name, method ]) => {
      bound[name] = method.bind(MessengerInstance)
      addToGlobal(MessengerInstance.__instanceType, name, bound[name])
      return bound
    }, {})
}

export const createMethods = (MessengerInstance, methods) => {
  return bindMethods(MessengerInstance, {
    ...MessengerInstance.config.methods,
    ...methods
  })
}

