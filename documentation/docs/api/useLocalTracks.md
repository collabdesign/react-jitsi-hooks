---
title: useLocalTracks
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Get tracks used on the client browser 

<Tabs
  defaultValue="common"
  values={[
    {label: 'Common', value: 'common'},
    {label: '🚧 Self-hosted', value: 'self-hosted'},
  ]}>
  <TabItem value="common">

```jsx {6} title="/src/App.js"
import { useRoom, useLocalTracks } from 'react-jitsi-hooks'

const App = () =>  {
  //  Connect to the conference
  useRoom({ roomName: 'helloworld' });
  const localTracks = useLocalTracks();
  const audioTrack = localTracks.find(({type}) => type === 'audio');
  const videoTrack = localTracks.find(({type}) => type === 'video');
  return <div>
    {videoTrack && <div>Your video is connected with {videoTrack.deviceName}</div>}
    {audioTrack && <div>Your audio is connected with {audioTrack.deviceName}</div>}
  </div>;
}
```
  </TabItem>
  <TabItem value="self-hosted">Self-hosted configurations are not yet documented in this repo</TabItem>
</Tabs>

## Parameters
No parameters.

## Returns

### `LocalTrack`[]
The local track registered. A `LocalTrack` is: 

* **`_id`:string** – The device id.
* **`jitsi`:JitsiTrack** – The jitsi track record. See [JitsiTrack](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ljm-api#jitsitrack)
* **`deviceName`:string** – The device name used. Ex: `default Facetime 640:1200`
* **`type`:string** – "audio" or "video"
* **`isMuted`:boolean** – if the track is muted. Same as `.jitsi.isMuted()` function.
* **`isStopped`:boolean** – if the track is in a stopped state.
