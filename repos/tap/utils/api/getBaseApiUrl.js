
/**
 * Builds the base url for all api calls using ENVs replaced at build time
 *
 * @returns {string} - Base Backend API url
 */
export const getBaseApiUrl = () => {
  return `http://${ process.env.SERVER_HOST }:${ process.env.SERVER_PORT }`
}