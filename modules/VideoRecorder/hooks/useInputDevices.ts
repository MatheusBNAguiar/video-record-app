import { useEffect, useMemo, useState } from "react";

type DeviceSelectState = 'idle' | 'permission-requested' | 'permission-denied'

type InputDevices ={audio: MediaDeviceInfo[], video: MediaDeviceInfo[]}

export function useInputDevices(){
  const [inputDevices, setInputDevices] = useState<InputDevices>()
  
  useEffect(()=>{
    navigator.mediaDevices.enumerateDevices()
      .then((devices=>{
        return setInputDevices({audio: devices.filter(({kind})=>(kind==='audioinput')), video: devices.filter(({kind})=>(kind==='videoinput'))})
      }))
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  },[])

  const getVideoStream = (deviceId: string) => {
    return navigator.mediaDevices.getUserMedia({
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        },
        deviceId: {
          exact: deviceId
        }
      },
    })
  }

  const getAudioStream = (deviceId: string) => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: {
          exact: deviceId
        }
      },
    })
  }

  return {
    inputDevices,
    getVideoStream,
    getAudioStream, 
  }
}
