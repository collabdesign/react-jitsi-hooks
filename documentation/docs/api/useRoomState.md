---
title: useRoomState
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use conference start. Usefull for: 

* Get incoming tracks from participants 
* Know the connection state

<Tabs
  defaultValue="participants"
  values={[
    {label: 'Participant tracks', value: 'participants'},
    {label: 'Connection state', value: 'state'},
  ]}>
  <TabItem value="participants">

```jsx {6} title="/src/App.js"
import { useRoom, useRoomState } from 'react-jitsi-hooks'

const App = () =>  {
  //  Connect to the conference
  useRoom({ roomName: 'helloworld' });
  const { remoteTracks } = useRoomState();

  return <div>
    {remoteTracks && <div>{Object.keys(remoteTracks).length} participants</div>}
  </div>;
}
```

  </TabItem>
  <TabItem value="state">

```jsx {6} title="/src/App.js"
import { useRoom, useRoomState } from 'react-jitsi-hooks'

const App = () =>  {
  //  Connect to the conference
  useRoom({ roomName: 'helloworld' });
  const { connectionState } = useRoomState();

  return <div>
    {connectionState && <div>conference is {connectionState}</div>}
  </div>;
}
```

  </TabItem>
</Tabs>

## Parameters
No parameters.

## Returns


### connection:[`JitsiMeetJS.JitsiConnection`](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ljm-api#jitsiconnection)

### connectionState:`string`
The state of the conference connection. Can be : 

* `"connected"`: the conference is connected
* `"failure"`: the conference had trouble connecting
* `undefined`: the conference connection is pending, or inactive (if `useRoom` was not called)

### remoteTracks:`Record<string, TrackRecord[]>`
A key-value pair where the key is __the participant unique identifier__, and the value the tracks they streams.

The streamed track is a `TrackRecord`: 
* **`_id`:string** – The device id.
* **`jitsi`:JitsiTrack** – The jitsi track record. See [JitsiTrack](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ljm-api#jitsitrack)
* **`type`:string** – "audio" or "video"
* **`isMuted`:boolean** – if the track is muted. Same as `.jitsi.isMuted()` function.
* **`isStopped`:boolean** – if the track is in a stopped state.
