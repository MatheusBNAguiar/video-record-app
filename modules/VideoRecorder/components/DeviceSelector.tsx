import styled from '@emotion/styled'
import { useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import type { InputDevices } from '../hooks/useInputDevices'

interface DeviceSelectorProps{
  inputDevices: InputDevices
  onAudioSelected: (audioId: string)=> void
  onVideoSelected: (videoId: string)=> void
}

type Option = { value: string, label: string}

function mapDeviceOption(device: MediaDeviceInfo):Option{
  return {
    value:device.deviceId,
    label:device.label
  }
}

const SelectLimitedSize = styled.div`
  max-width: 300px;
`

export function DeviceSelector(props: DeviceSelectorProps){
  const [audioOptions, setAudioOptions] = useState<Option[]>([])
  const [videoOptions, setVideoOptions] = useState<Option[]>([])

  const [selectedAudio, setSelectedAudio] = useState<Option | null >(null)
  const [selectedVideo, setSelectedVideo] = useState<Option | null >(null)

  useEffect(()=>{
    const {audio, video} = props.inputDevices
    const audioOptions = audio.map(mapDeviceOption)
    const videoOptions = video.map(mapDeviceOption)

    setAudioOptions(audioOptions)
    setVideoOptions(videoOptions)

    setSelectedAudio((prev)=>{
      if(!prev){
        return audioOptions[0]
      }return prev
    })
    setSelectedVideo((prev)=>{
      if(!prev){
        return videoOptions[0]
      }return prev
    })
  },[props.inputDevices])

  useEffect(()=>{
    if(selectedAudio){
      props.onAudioSelected(selectedAudio.value)
    }
  },[selectedAudio])
  
  useEffect(()=>{
    if(selectedVideo){
      props.onVideoSelected(selectedVideo.value)
    }
  },[selectedVideo])

  
  console.log(props)
  return (
    <div>
      <SelectLimitedSize>
        <Select options={audioOptions} value={selectedAudio} onChange={setSelectedAudio}/>
      </SelectLimitedSize>
      <SelectLimitedSize>
        <Select
          value={selectedVideo}
          onChange={setSelectedVideo}
          options={videoOptions}
        />
      </SelectLimitedSize>
    </div>
  )
}
