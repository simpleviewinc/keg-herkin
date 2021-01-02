
const testMethod = () => {
  console.log(`---------- testMethod ----------`)
}

const bindMethods = (MessengerInstance, methods) => {
  return Object.entries(methods)
    .reduce((bound, [ name, method ]) => {
      bound[name] = method.bind(MessengerInstance)
      return bound
    }, {})
}

export const createMethods = (MessengerInstance, methods) => {
  return bindMethods(MessengerInstance, {
    testMethod,
    ...MessengerInstance.config.methods,
    ...methods
  })
}

