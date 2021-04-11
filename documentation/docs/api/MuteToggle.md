---
title: <MuteToggle />
---

Mute/Unmute the audio local tracks. **Remote track won't work for now**.


```jsx {8} title="/src/App.js"
import { useRoom, useLocalTracks , MuteToggle} from 'react-jitsi-hooks'

const App = () =>  {
  //  Connect to the conference
  useRoom({ roomName: 'helloworld' });
  return <div>
    <MuteToggle mutedElement="unmute" unMutedElement="mute" />
  </div>;
}
```


## Props

* **`mutedElement`:React.ReactNode** Displays when audio is muted
* **`unMutedElement`?:string** Displays when audio is unmuted
* **`onToggle`?:(isMuted:boolean)=>void** Callback after switching