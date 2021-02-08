import { apiRequest } from 'SVUtils/apiRequest'

export const loadBdd = () => {
  const { features, definitions } = await apiRequest(`/bdd`)
}