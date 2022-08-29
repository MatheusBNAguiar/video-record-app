const videoConstraints = {
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
}

export function getVideoStream (deviceId: string)  {
  return navigator.mediaDevices.getUserMedia({
    video: {
      ...videoConstraints,
      deviceId: {
        exact: deviceId
      }
    },
  })
}

export function getAudioStream (deviceId: string)  {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: {
        exact: deviceId
      }
    },
  })
}

export function getSharedScreenStream(){
  return navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true
  });
}
