import JitsiMeetJS from '@lyno/lib-jitsi-meet'
import {
  JitsiMeetInitOptions,
  JitsiMeetConferenceOptions,
  JitsiMeetConnectionOptions,
} from './configure.types'
const options: JitsiMeetConnectionOptions = {
  hosts: {
    domain: 'jitsi-meet.example.com',
    muc: 'conference.jitsi-meet.example.com',
  },
  serviceUrl: '//jitsi-meet.example.com/http-bind',
  // The name of client node advertised in XEP-0115 'c' stanza
  clientNode: 'http://jitsi.org/jitsimeet',
}
const initOptions: JitsiMeetInitOptions = {
  disableAudioLevels: true,
}
JitsiMeetJS.init(initOptions)
const connection = new JitsiMeetJS.JitsiConnection(null, null, options)
