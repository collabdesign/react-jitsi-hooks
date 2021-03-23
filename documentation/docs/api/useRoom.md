---
title: useRoom
slug: /api
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create or connect to a new conference.

<Tabs
  defaultValue="common"
  values={[
    {label: 'Common', value: 'common'},
    {label: '🚧 Self-hosted', value: 'self-hosted'},
  ]}>
  <TabItem value="common">

```jsx {5} title="/src/App.js"
import { useRoom, useRoomState, useLocalTracks } from 'react-jitsi-hooks'

const App = () =>  {
  //  Connect to the conference
  useRoom({ roomName: 'helloworld' });

  // Consume room state.
  const { connectionState } = useRoomState()

  return <div>
    {connectionState === 'connected' 
        ? 'you are on room helloworld' 
        : 'not connected'
    }
  </div>;
}
```
  </TabItem>
  <TabItem value="self-hosted">Self-hosted configurations are not yet documented in this repo</TabItem>
</Tabs>

## Parameters

### (required) `roomName`:string
The conference room name. All participants using the same `roomName` will meet together

### (optional) `initOptions`?:Record
Options passed to [`JitsiMeetJS.init`](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ljm-api#jitsimeetjs). 

* **`useIPv6`:boolean**
* **`disableAudioLevels`:boolean** – Enables/disables audio levels.  default: true
* **`disableSimulcast`:boolean** – Enables/disables simulcast.
* **`enableWindowOnErrorHandler`?:boolean** – Enables/disables attaching global onerror handler (window.onerror). default: `false`
* **`disableThirdPartyRequests`:boolean** - Disables third parties and the callstats API won't be included.
* **`enableAnalyticsLogging`:boolean** – Enables/disables analytics logging. default: `false`
* **`externalStorage`:Storage** – Specified how to store data. default: localStorage functions
* **`callStatsCustomScriptUrl`?:string** - Custom url to access callstats client script
* **`disableRtx`?:boolean** – Enables/disable the use of RTX. default: `false`
* **`disabledCodec`:string** - Mime type of the code that should not be negotiated on the `peerconnection`.
* **`preferredCodec`:string** - Mime type of the codec that needs to be made the preferred codec for the connection.
* **`useTurnUdp`?:boolean** – Enables use of turn over udp for jvb. It is disabled because not very useful (if the client can use udp, it likely can connect to jvb directly over udp too; but it can be useful to still enable udp turn when an udp turn is known to be whitelisted on a network)

## (optional) `connectionOptions`?:Record
Options passed to [`JitsiMeetJS.JitsiConnection#constructor`](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ljm-api#jitsiconnection)

### (optional) `roomOptions`?:Record
Options passed to [`JitsiMeetJS.JitsiConnection#initJitsiConference`](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ljm-api#jitsiconnection).
