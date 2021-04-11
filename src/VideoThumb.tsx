import { useEffect } from 'react'
import { TrackRecord } from './useRoomState.types'
import Video from './Video'
import Audio from './Audio'

export type VideoThumbProps = {
  audio?: TrackRecord
  video?: TrackRecord
  className?: string
  containerClassName?: string
}
const VideoThumb = ({
  audio,
  video,
  containerClassName = '',
  className = '',
}: VideoThumbProps) => {
  return (
    <div className={containerClassName}>
      {video && <Video track={video} className={className} />}
      {audio && <Audio track={audio} />}
    </div>
  )
}

export default VideoThumb
