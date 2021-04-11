---
title: <VideoThumb />
---

Component to stream video and audio to a `<video>` and `<audio>` html5 tag.

**Use only for remote tracks**: Local track don't need audio ;)

```jsx {13} title="/src/App.js"
import { useRoom, useRoomState, VideoThumb } from 'react-jitsi-hooks'

const App = () =>  {
  //  Connect to the conference
  useRoom({ roomName: 'helloworld' });
  const { remoteTracks } = useRoomState();

  return <div>
    {Object.entries(remoteTracks).map(([participant, tracks]) => {
        const video = tracks.find(({type}) => type === 'video');
        const audio = tracks.find(({type}) => type === 'audio');
        return <VideoThumb key={participant} video={video} audio={audio} />;
    })}
  </div>;
}
```


## Props

* **`video`:TrackRecord** The video track to stream
* **`audio`:TrackRecord** The audio track to stream
* **`className`?:string** Classname to apply to the `<video>` tag
* **`containerClassName`?:string** Classname to apply to the `<video /><audio />` container (it's a `div`).