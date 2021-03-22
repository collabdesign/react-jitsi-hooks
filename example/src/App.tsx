import React, {useEffect, useState,} from 'react';
import {useRoom, useRoomState, useLocalTracks} from './lib'
import {VideoThumb, Video, MuteToggle} from './lib/ui'
import Log from './lib/logger'
import './App.css';
const Demo = () => {
  useRoom({roomName: 'root'});
  const {connection, remoteTracks} = useRoomState();
  const localTracks = useLocalTracks();
  // get here the first video and audio track available. 
  // if you want user to choose device, use the track.deviceName. (ex: 'JBL500 (bluetooth)')
  const video = localTracks.find(track => track.type === 'video');
  return <>
  <div style={{display: 'flex'}}>
    <div style={{flex: 1, background: 'pink', maxWidth: '32.33%', margin: '1%'}}>
      <h2 style={{color: 'white', textAlign: 'center'}}>You</h2>
      {video && <Video track={video} />}
      {video &&  <MuteToggle  mutedElement='Unmute' activeElement="mute" onToggle={(isMuted) => {
        Log.info('change mute/unmute to ', isMuted ?'muted': 'unmuted')
      }} />}
    </div>
    {Object.keys(remoteTracks).map((participantId) => {
        const tracks = remoteTracks[participantId]
        const video = tracks.find(track => track.type === 'video');
        const audio = tracks.find(track => track.type === 'audio');
        return  <div style={{flex: 1, background: 'white',  maxWidth: '32.33%',  margin: '1%'}} key={participantId}>
          <h2 style={{color: 'black', textAlign: 'center'}}>{participantId}</h2>
          <VideoThumb video={video} audio={audio}/>
        </div>
    })}
  </div>
  <pre>{JSON.stringify({
    connection: !!connection, 
    localTracks: localTracks.map(track => track.deviceName),
    remoteTracks: Object.keys(remoteTracks).length
  }, null, 2)}</pre></>
}
const App = () => {
  const [display, setDisplay] = useState(false);
  return <div>
    <button onClick={() => setDisplay(true)}>Click</button><br />
    {display && <Demo />}
  </div>;
}
export default App;
