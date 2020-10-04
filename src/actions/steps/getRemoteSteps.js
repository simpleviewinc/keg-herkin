import { apiRequest } from 'SVUtils/apiRequest'
import { upsertSteps } from './upsertSteps'

export const getRemoteSteps = async () => {
  const steps = await apiRequest(`/steps`)
  steps && upsertSteps(steps)
}