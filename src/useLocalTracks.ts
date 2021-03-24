import { useEffect, useState } from 'react'
import useRoomState from './useRoomState'
import { TrackRecord } from './useRoomState.types'

export type LocalTracks = {
  deviceName: string | undefined
} & TrackRecord
const useLocalTracks = (): LocalTracks[] => {
  const { localTracks } = useRoomState()

  const [localDevices, setLocalDevices] = useState<MediaDeviceInfo[]>([])
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      setLocalDevices(devices)
    })
  }, [])

  return localTracks.map((track) => {
    const id = track.jitsi.getDeviceId()
    const deviceName = localDevices.find(({ deviceId }) => deviceId === id)
    return { ...track, deviceName: deviceName?.label }
  })
}
export default useLocalTracks
