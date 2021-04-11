---
title: <Video />
---

Component to stream video to a `<video>` html5 tag. Usefull for rendering local video track

```jsx {11} title="/src/App.js"
import { useRoom, useLocalTracks, Video } from 'react-jitsi-hooks'

const App = () =>  {
  //  Connect to the conference
  useRoom({ roomName: 'helloworld' });
  const localTracks = useLocalTracks();
  const videoTrack = localTracks.find(({type}) => type === 'video');

  return <div>
    <Video track={videoTrack} />
  </div>;
}
```


## Props

* **`track`:TrackRecord** The video track to stream
* **`className`?:string** Classname to apply to the tag