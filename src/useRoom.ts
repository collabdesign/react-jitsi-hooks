import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import JitsiMeetJS from '@lyno/lib-jitsi-meet'
import useRoomState from './useRoomState'
import { UseRoomProps } from './useRoom.types'
import Log from './logger'
import shallow from 'zustand/shallow'
import { DeviceId } from './device.types'
import ParticipantConnectionStatusHandler from '@lyno/lib-jitsi-meet/modules/connectivity/ParticipantConnectionStatus'
import { Room } from './useRoomState.types'
const useRoom = (props?: UseRoomProps) => {
  const {
    roomName = `${+new Date()}`,
    initOptions = {},
    roomOptions = {},
    connectionOptions = {},
    startVideo = true,
  } = props || {}
  const [connection, connectionState] = useRoomState(
    useCallback((state) => [state.connection, state.connectionState], []),
    shallow
  )
  const [join, localTracks, addLocalTrack, isJoined] = useRoomState(
    useCallback(
      (state) => [
        state.join,
        state.localTracks,
        state.addLocalTrack,
        state.isJoined,
      ],
      []
    ),
    shallow
  )
  const [setConnection, setConnectionState] = useRoomState(
    useCallback((state) => [state.setConnection, state.setConnectionState], []),
    shallow
  )
  const [room, setRoom] = useRoomState(
    useCallback((state) => [state.room, state.setRoom], []),
    shallow
  )
  const onConnectionSuccess = useCallback(
    (connection) => {
      Log.info('JitsiConnection: connected')
      setConnectionState('connected')
    },
    [setConnectionState]
  )
  const onConnectionFailure = useCallback(() => {
    Log.warn('JitsiConnection: failure')
    setConnection(null)
    setConnectionState('failure')
  }, [setConnection, setConnectionState])

  const [
    remoteTracks,
    setRemoteTrack,
    addRemoteTrack,
    removeRemoteTrack,
  ] = useRoomState(
    useCallback(
      (state) => [
        state.remoteTracks,
        state.setRemoteTrack,
        state.addRemoteTrack,
        state.removeRemoteTrack,
      ],
      []
    ),
    shallow
  )
  const onDeviceListChanged = useCallback((deviceList: [any]) => {
    Log.info('Connection fails, devices changed', deviceList)
  }, [])

  useEffect(() => {
    if (connection) return
    const initConfig = {
      /* Default params */
      disableAudioLevels: true,
      /* overload */
      ...initOptions,
    }
    Log.info('JitsiMeetJS#init', initConfig)
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR)
    JitsiMeetJS.init(initConfig)
    JitsiMeetJS.mediaDevices.addEventListener(
      JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
      onDeviceListChanged
    ) // FIXME: From the demo, we never remove this event listener?

    const connectionConfig = {
      hosts: {
        domain: 'meet.jit.si',
        muc: 'conference.meet.jit.si',
        focus: 'focus.meet.jit.si',
      },
      externalConnectUrl: 'https://meet.jit.si/http-pre-bind',
      enableP2P: true,
      p2p: {
        enabled: true,
        preferH264: true,
        disableH264: true,
        useStunTurn: true,
      },
      useStunTurn: true,
      bosh: `https://meet.jit.si/http-bind?room=${roomName}`,
      websocket: 'wss://meet.jit.si/xmpp-websocket',
      clientNode: 'http://jitsi.org/jitsimeet',

      ...connectionOptions,
    }
    Log.info('JitsiMeetJS#JitsiConnection', connectionConfig)
    const _connection = new JitsiMeetJS.JitsiConnection(
      null,
      null,
      connectionConfig
    )
    setConnection(_connection)
    const successCallback = () => onConnectionSuccess(_connection)
    /**
     * Remove event listeners from connection
     */
    const onConnectionDisconnected = () => {
      _connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        successCallback
      )
      _connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_FAILED,
        onConnectionFailure
      )
      _connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
        onConnectionDisconnected
      )
    }
    /**
     * Attach event handlers to connection
     */
    _connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      successCallback
    )
    _connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      onConnectionFailure
    )
    _connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      onConnectionDisconnected
    )

    _connection.connect()
  }, [
    initOptions,
    connectionOptions,
    onConnectionFailure,
    onConnectionSuccess,
    onDeviceListChanged,
  ])

  const onRemoteTrack = useCallback((track: JitsiMeetJS.JitsiTrack) => {
    if (track.isLocal()) {
      Log.log('local track', track)
      return
    }
    const participant = '' + track.getParticipantId()
    addRemoteTrack(participant, {
      jitsi: track,
      _id: `${+new Date()}`,
      type: track.getType(),
    })

    track.addEventListener(
      JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
      (audioLevel: number) => Log.info(`Audio Level remote: ${audioLevel}`)
    )
    track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => {
      Log.info('TRACK_MUTE_CHANGED remote track muted')
      setRemoteTrack(participant, track, { isMuted: true })
    })
    track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
      Log.info('LOCAL_TRACK_STOPPED remote track stoped')
    )
    track.addEventListener(
      JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
      (deviceId: DeviceId) =>
        Log.info(`track audio output device was changed to ${deviceId}`)
    )
  }, [addRemoteTrack, setRemoteTrack  ]);

  const onConferenceJoined = useCallback((room: Room) => {
    Log.info('conference joined, add local track to the room')
    join()
    for (let i = 0; i < localTracks.length; i++) {
      room.addTrack(localTracks[i])
    }
  }, [join, localTracks]);

  const onUserLeft = useCallback((participant: string) => {
    Log.info('user left')
    if (!remoteTracks[participant]) {
      Log.warn(`Participant ${participant} not referenced in ${Object.keys(remoteTracks).join(', ')}`)
      return
    }
    removeRemoteTrack(participant)
  }, [removeRemoteTrack, remoteTracks]);

  const onLocalTracks = useCallback(async (localTracks: JitsiMeetJS.JitsiLocalTrack) => {
    if(!room) return;
    Log.info('Local track changed');
    for (let i = 0; i < localTracks.length; i++) {
      localTracks[i].addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
        (audioLevel: number) => Log.info(`Audio Level local: ${audioLevel}`)
      )
      localTracks[i].addEventListener(
        JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
        () => Log.info('TRACK_MUTE_CHANGED local track muted')
      )
      localTracks[i].addEventListener(
        JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
        () => Log.info('LOCAL_TRACK_STOPPED local track stoped')
      )
      localTracks[i].addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        (deviceId: string) =>
          Log.info(`track audio output device was changed to ${deviceId}`)
      )

      if (isJoined) {
        try{
          await room.addTrack(localTracks[i])
        }catch(e) {
          Log.error(e);
          return;
        }
      }
      addLocalTrack({
        jitsi: localTracks[i],
        _id: `${+new Date()}`,
        type: localTracks[i].getType(),
      })
    }
  }, [room, addLocalTrack, isJoined]);

  useEffect(() => {
    if (!connection) return
    // TODO be able to pass cameraDeviceId and micDeviceId
    JitsiMeetJS.createLocalTracks({ devices: ['audio', 'video'] })
      .then(onLocalTracks)
      .catch((error: Error) => {
        throw error
      })
  }, [onLocalTracks, connection])

  useEffect(() => {
    if (!connection || room || connectionState !== 'connected' || isJoined) return
    // Create a room
    const _room = connection.initJitsiConference('conference', {
      openBridgeChannel: true,
      ...roomOptions,
    })
    setRoom(_room);
    const successCallback = () => {
      onConferenceJoined(_room);
    }
    _room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack)
    _room.on(
      JitsiMeetJS.events.conference.TRACK_REMOVED,
      (track: JitsiMeetJS.JitsiTrack) => {
        removeRemoteTrack(track.getParticipantId());
      }
    )
    _room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, successCallback)
    _room.on(JitsiMeetJS.events.conference.USER_JOINED, (id: string) => {
      Log.info('User join, wait for remote track')
      addRemoteTrack(id)
    })
    _room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft)
    _room.on(
      JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED,
      (track: JitsiMeetJS.JitsiTrack) => {
        Log.info(`TRACK_MUTE_CHANGED ${track.getType()} - ${track.isMuted()}`)
      }
    )
    _room.on(
      JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
      (userID: string, displayName: string) =>
        Log.info(`${userID} - ${displayName}`)
    )
    _room.on(
      JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
      (userID: string, audioLevel: string) =>
        Log.info(`${userID} - ${audioLevel}`)
    )
    _room.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, () =>
      Log.info(`${room.getPhoneNumber()} - ${room.getPhonePin()}`)
    )
    _room.join()
  }, [connectionState, room, connection, isJoined, roomOptions, addRemoteTrack, setRoom, onUserLeft, onRemoteTrack, onConferenceJoined, removeRemoteTrack])
}
export default useRoom
