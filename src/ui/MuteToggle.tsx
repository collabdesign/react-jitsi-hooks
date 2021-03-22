import React, { useCallback, useState } from 'react';
import JitsiMeetJS from '@lyno/lib-jitsi-meet'
import Log from '../logger'
import useLocalTracks  from '../useLocalTracks';

type MuteToggleProps = {
    mutedElement: React.ReactNode;
    activeElement: React.ReactNode;
    onToggle?: (isMuted: boolean) => void;
}

const MuteToggle = ({mutedElement, activeElement, onToggle}: MuteToggleProps) => {
   
    const localTracks = useLocalTracks();
    const track = localTracks.find(track => !track.jitsi.isEnded() && track.type === 'audio');
    const availableTracks = localTracks.filter(track => !track.jitsi.isEnded() && track.type === 'audio');
    const [loading, setLoading] = useState<boolean>(false);
    
    const onClick = useCallback(async (event) => {
        if(event.preventDefault) event.preventDefault();
        if(!track || !availableTracks) return;
        if(loading) return;
        setLoading(true)
        try{
            if(track.jitsi.isMuted()){
                await Promise.all(availableTracks.map(t => t.jitsi.unmute()))
                if(onToggle) onToggle(false);
            }else{
                await Promise.all(availableTracks.map(t => t.jitsi.mute()))
                if(onToggle) onToggle(true);
            }
        }catch(e){
            Log.error('Can not toggle mute: ', e);
        }finally{
            setLoading(false);
        }
    }, [track, availableTracks, loading, onToggle]);
    if(track?.jitsi.isMuted()) {
        return <a onClick={onClick} href="#unmute">{track.jitsi.getDeviceId()}{mutedElement}</a>;
    }
    return <a onClick={onClick} href="#mute">{activeElement}</a>;;
}

export default MuteToggle;