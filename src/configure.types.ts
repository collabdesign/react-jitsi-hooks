import { DeviceId } from './device.types'
export type JitsiMeetInitOptions = {
  useIPv6?: boolean
  disableAudioLevels?: boolean
  disableSimulcast?: boolean
  enableWindowOnErrorHandler?: boolean
  /*  if true - callstats will be disabled and the callstats API won't be included. */
  disableThirdPartyRequests?: boolean
  enableAnalyticsLogging?: boolean
  /* Object that implements the Storage interface. If specified this object will be used for storing data instead of localStorage */
  externalStorage?: {
    length: number
    clear(): void
    getItem(key: string): string | null
    key(index: number): string | null
    removeItem(key: string): void
    setItem(key: string, value: string): void
  }
  /* custom url to access callstats client script */
  callStatsCustomScriptUrl?: string
  disableRtx?: boolean
  disabledCodec?: boolean
  /* the mime type of the codec that needs to be made the preferred codec for the connection. */
  preferredCodec?: string
  /*
   * boolean property (default false).
   * Enables use of turn over udp for jvb.
   * It is disabled because not very useful
   * (if the client can use udp, it likely can connect to jvb directly over udp too;
   * but it can be useful to still enable udp turn when an
   * udp turn is known to be whitelisted on a network)
   */
  useTurnUdp?: boolean
}
export type JitsiMeetLocalTrackOptions = {
  /* If that property is not set GUM will try to get all available devices. */
  devices?: 'desktop' | 'video' | 'audio'
  /* the prefered resolution for the local video. */
  resolution?: number
  /*  the prefered encoding properties for the created track (replaces 'resolution' in newer releases of browsers) */
  constraints?: string
  /* the video device that is going to be used */
  cameraDeviceId?: DeviceId
  /* the audio device that is going to be used */
  micDeviceId?: DeviceId
  /* the minimum frame rate for the video stream */
  minFps?: number
  /* the maximum frame rate for the video stream */
  maxFps?: number
  /* fps for desktop sharing */
  desktopSharingFrameRate?: {
    min?: number
    max?: number
  }
  /* DeviceID used for screensharing */
  desktopSharingSourceDevice?: DeviceId | string
  /* facing mode for a camera */
  facingMode?: 'user' | 'environment'
  /* f set to true, JitsiMediaDevicesEvents.PERMISSION_PROMPT_IS_SHOWN will be fired when browser shows gUM permission prompt. */
  firePermissionPromptIsShownEvent?: boolean
}

export type JitsiMeetConnectionOptions = {
  /* XMPP service URL. For example 'wss://server.com/xmpp-websocket' for Websocket or '//server.com/http-bind' for BOSH */
  serviceUrl?: string
  hosts?: {
    domain?: string
    muc?: string
    anonymousdomain?: string
  }
  /*  boolean property which enables the lipsync feature. Currently works only in Chrome and is disabled by default. */
  enableLipSync?: boolean
  /* The name of client node advertised in XEP-0115 'c' stanza */
  clientNode?: string
  xmppPing?: {
    /* how often to send ping requests, default: 10000 (10 seconds) */
    interval?: string
    /* the time to wait for ping responses, default: 5000 (5 seconds) */
    timeout?: number
    /* how many ping failures will be tolerated before the connection is killed, default: 2 */
    threshold?: number
  }
  websocketKeepAlive?: number
  websocketKeepAliveUrl?: string
}

export type JitsiMeetConferenceOptions = {
  openBridgeChannel?: 'datachannel' | 'websocket' | boolean
  /* type of recording to be used */
  recordingType?: string
  /* callstats credentials */
  callStatsID?: string
  /* callstats credentials */
  callStatsSecret?: string
  /* boolean property. Enables/disables talk while muted detection, by default the value is false/disabled */
  enableTalkWhileMuted?: boolean
  /* ignores start muted events coming from jicofo. */
  ignoreStartMuted?: boolean
  /* enables silent mode, will mark audio as inactive will not send/receive audio */
  startSilent?: boolean
  /* Used for statistics to identify conference, if tenants are supported will contain tenant and the non lower case variant for the room name */
  confID?: string
  /* Used for statistics to identify the site where the user is coming from, if tenants are supported it will contain a unique identifier for that tenant. If not provided, the value will be infered from confID */
  siteID?: string
  /* The id to be used as stats instead of default callStatsUsername */
  statisticsId?: string
  /* The display name to be used for stats, used for callstats */
  statisticsDisplayName?: string
  /* The real JID of focus participant - can be overridden here */
  focusUserJid?: string
  enableNoAudioDetection?: boolean
  enableNoisyMicDetection?: boolean
  enableRemb?: boolean
  enableTcc?: boolean
  useRoomAsSharedDocumentName?: boolean
  /*  if set to 'true', we will cap the video send bitrate when we are told we have not been selected by any endpoints (and therefore the non-thumbnail streams are not in use). */
  enableLayerSuspension?: boolean
  deploymentInfo?: 'shard' | 'userRegion'
}
