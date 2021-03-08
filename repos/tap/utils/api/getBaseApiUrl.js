export const getBaseApiUrl = () => {
  return `http://${ process.env.SERVER_HOST }:${ process.env.SERVER_PORT }`
}