import React, { useEffect, useRef } from 'react'
import { TrackRecord } from '../useRoomState.types'

export type AudioProps = {
  track: TrackRecord
}

export const Audio = ({ track }: AudioProps) => {
  const element = useRef(null)
  useEffect(() => {
    if (track.type !== 'audio')
      throw new Error(`Can not mount a ${track.type}. "audio" type required`)
    const node = element.current
    track.jitsi.attach(node)
    return () => {
      track.jitsi.detach(node)
    }
  }, [track])
  return <audio autoPlay muted={track.isMuted} ref={element}></audio>
}

export default Audio
