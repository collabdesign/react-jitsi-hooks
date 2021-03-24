import JitsiMeetJS from '@lyno/lib-jitsi-meet'
import { DeviceId } from './device.types'
export type ConnectionState = 'connected' | 'failure' | 'disconnected'
export type TrackRecord = {
  /*
  * Uniq identifier
  */
  _id: string
  /*
  * Jitsi Track details
  */
  jitsi: JitsiMeetJS.JitsiTrack
  /*
  * For local tracks: Video or audio input. Output managed in jitsi property.
  * For remote tracks: Video or audio output.
  */
  type: string
  isMuted?: boolean
  isStopped?: boolean
}
export type Connection = typeof JitsiMeetJS.JitsiConnection | null
export type Room = typeof JitsiMeetJS.JitsiConference | null
export type UseRoomState = {
  /* Jitsi connection */
  connection: Connection
  connectionState?: ConnectionState
  /* Connected conference room */
  room: Room
  /* Setter for room */
  setRoom(room: Room): void
  /* Have joined the room */
  isJoined: boolean
  /* You own track */
  localTracks: TrackRecord[]
  /* Track of participants */
  remoteTracks: Record<DeviceId | string, TrackRecord[]>
  /* Join the conference */
  join(): void
  /* Quit the conference */
  leave(): void
  /* Local track have been detected */
  addLocalTrack(track: TrackRecord): void
  /* Connection change state */
  setConnectionState(state: ConnectionState): void
  /* Connection setter */
  setConnection(connection: Connection): void
  /* A new parrticipant join the connected conference */
  addRemoteTrack(id: DeviceId, track?: TrackRecord): void
  /* A participant leaves the conference  */
  removeRemoteTrack(id: DeviceId): void
  /* Update a participant track (for example when muted) */
  setRemoteTrack(
    id: DeviceId,
    track: TrackRecord,
    state: Partial<TrackRecord>
  ): void
}
