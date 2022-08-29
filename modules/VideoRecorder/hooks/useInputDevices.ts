import { useEffect, useMemo, useState } from "react";

type DeviceSelectState = 'idle' | 'permission-requested' | 'permission-denied'

export type InputDevices ={audio: MediaDeviceInfo[], video: MediaDeviceInfo[]}

export function useInputDevices(){
  const [inputDevices, setInputDevices] = useState<InputDevices>({audio:[], video:[]})
  const [selectedVideoId, setSelectedVideoId] = useState<string>('')
  const [selectedAudioId, setSelectedAudioId] = useState<string>('')

  useEffect(()=>{
    navigator.mediaDevices.enumerateDevices()
      .then((devices=>{
        const audio = devices.filter(({kind})=>(kind==='audioinput'))
        const video = devices.filter(({kind})=>(kind==='audioinput'))
        setSelectedVideoId(audio?.[0]?.deviceId)
        setSelectedAudioId(video?.[0]?.deviceId)
        return setInputDevices({audio , video })
      }))
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  },[])

  return {
    inputDevices,
    selectedVideoId,
    selectedAudioId,
    onAudioSelected: setSelectedVideoId,
    onVideoSelected: setSelectedAudioId,
  }
}
