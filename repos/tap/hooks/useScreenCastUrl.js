import { useMemo } from 'react'
import { Values } from 'SVConstants'
import { getBaseApiUrl } from 'SVUtils/api/getBaseApiUrl'

const { HOST, PORT, VNC_ACTIVE } = Values.VNC_CONFIG

/**
 * Hook to dynamically build the novnc url
 * If VNC_ACTIVE is false, it returns an empty string
 *
 * @returns {string} - Built novnc url
 */
export const useScreencastUrl = () => {
  return useMemo(() => {
    // TODO: move this to a utility helper
    return VNC_ACTIVE
      ? `${getBaseApiUrl()}/novnc/vnc_auto.html?host=${HOST}&port=${PORT}`
      : ``
  }, [])
}