import React, { useEffect, useRef } from 'react'
import { TrackRecord } from '../useRoomState.types'

export type VideoProps = {
  track: TrackRecord
  className?: string
}

export const Video = ({ track, className = '' }: VideoProps) => {
  const element = useRef(null)
  useEffect(() => {
    if (track.type !== 'video')
      throw new Error(`Can not mount a ${track.type}. "video" type required`)
    const node = element.current
    track.jitsi.attach(node)
    return () => {
      track.jitsi.detach(node)
    }
  }, [track])
  return <video className={className} autoPlay ref={element}></video>
}

export default Video
