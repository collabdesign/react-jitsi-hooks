import {
  JitsiMeetConferenceOptions,
  JitsiMeetConnectionOptions,
  JitsiMeetInitOptions,
} from './configure.types'
export type UseRoomProps =
  | {
      /**
       * Room name we will use to start
       * the conference.
       */
      roomName: string
      /**
       * Confernence Initialisation options
       */
      initOptions?: JitsiMeetInitOptions
      /* 
      * 
      */
      roomOptions?: JitsiMeetConferenceOptions
      /* 
      * Infos for self-hosted instance.
      */
      connectionOptions?: JitsiMeetConnectionOptions
    }
  | undefined
