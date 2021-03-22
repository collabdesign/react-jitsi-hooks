import JitsiMeetJS from '@lyno/lib-jitsi-meet'
import { DeviceId } from './device.types'
export type ConnectionState = 'connected' | 'failure' | 'disconnected'
export type TrackRecord = {
  _id: string
  jitsi: JitsiMeetJS.JitsiTrack
  type: string
  isMuted?: boolean
  isStopped?: boolean
}
export type Connection = typeof JitsiMeetJS.JitsiConnection | null;
export type Room = typeof JitsiMeetJS.JitsiConference | null
export type UseRoomState = {
  /* Jitsi connection */
  connection: Connection
  connectionState?: ConnectionState
  /* Connected conference room */
  room: Room
  setRoom(room: Room): void;
  /* Have joined the room */
  isJoined: boolean
  join(): void
  leave(): void
  /* You own track */
  localTracks: TrackRecord[]
  addLocalTrack(track: TrackRecord): void
  /* Track of participants */
  remoteTracks: Record<DeviceId | string, TrackRecord[]>
  setConnectionState(state: ConnectionState): void
  setConnection(connection: Connection): void,
  addRemoteTrack(id: DeviceId, track?: TrackRecord): void
  removeRemoteTrack(id: DeviceId): void
  setRemoteTrack(
    id: DeviceId,
    track: TrackRecord,
    state: Partial<TrackRecord>
  ): void
}
