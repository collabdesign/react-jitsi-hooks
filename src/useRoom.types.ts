import {
  JitsiMeetConferenceOptions,
  JitsiMeetConnectionOptions,
  JitsiMeetInitOptions,
} from './configure.types'
export type UseRoomProps =
  | {
      roomName?: string
      initOptions?: JitsiMeetInitOptions
      roomOptions?: JitsiMeetConferenceOptions
      connectionOptions?: JitsiMeetConnectionOptions
      /* Start video mode, default true */
      startVideo?: boolean
    }
  | undefined
