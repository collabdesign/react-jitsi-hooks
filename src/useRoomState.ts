import create from 'zustand'
import { UseRoomState } from './useRoomState.types'

import Log from './logger'
import JitsiMeetJS from '@lyno/lib-jitsi-meet'
const useRoom = create<UseRoomState>((set, get) => ({
  connection: null,
  setConnectionState(connectionState) {
    set({ connectionState })
  },
  room: null,
  setRoom(room) {
    set({ room })
  },
  isJoined: false,
  join() {
    set({ isJoined: true })
  },
  leave() {
    set({ isJoined: false })
  },
  localTracks: [],
  addLocalTrack(track) {
    set({ localTracks: [...get().localTracks, track] })
  },
  remoteTracks: {},
  setRemoteTrack(id, track, state) {
    Log.error('set', id, track)

    const remoteTracks = get().remoteTracks[`${id}`] || []
    const match = remoteTracks.find((t) => t._id === track._id)
    if (!match) {
      Log.warn(`Track ${track._id} not found`)
      return
    }
    set({
      remoteTracks: {
        ...get().remoteTracks,
        [`${id}`]: [
          ...remoteTracks.filter((t) => t !== match),
          { ...match, ...state },
        ],
      },
    })
  },
  addRemoteTrack(id, track) {
    if (!track) {
      Log.warn(`track ${id} is undefined`)
    }
    const remoteTracks = get().remoteTracks[`${id}`] || []
    set({
      remoteTracks: {
        ...get().remoteTracks,
        [`${id}`]: track ? [...remoteTracks, track] : [],
      },
    })
  },
  removeRemoteTrack(id) {
    const tracks = get().remoteTracks
    Log.info(
      `remove remote track ${id} in (${Object.keys(tracks).join(', ')}) `
    )
    tracks[`${id}`] = []
    delete tracks[`${id}`]
    set({ remoteTracks: { ...tracks } })
  },
  setConnection(connection) {
    const currentConnection = get().connection
    if (currentConnection !== null) {
      currentConnection.disconnect()
    }
    set({ connection })
  },
}))

export default useRoom
