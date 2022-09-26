import { useState } from 'react'
import './App.css'
import { AudioRecorder } from './lib'
import { IDataAvailable } from './lib/containers/AudioRecorder/AudioRecorder'
import RecordIcon from './assets/record.svg'

function App() {
  const [isRecordMode, setIsRecordMode] = useState(false)
  const [audioSrc, setAudioSrc] = useState("")

  const onDataReady = (value: IDataAvailable) => {
    console.log(value);
    
    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target !== null)
        setAudioSrc(event.target.result as string)
    }
    reader.readAsDataURL(value.value)

    setIsRecordMode(false)
  }
  const onCancel = () => {
    setIsRecordMode(false)
    setAudioSrc("")
  }

  const onPermissionDenied = () => {
    setIsRecordMode(false)
    setAudioSrc("")
    alert("Permission Denied")
  }

  return (
    <div className="App">
      {
        audioSrc && (
          <audio src={audioSrc} controls />
        )
      }
      <div className='chat-mode'>
        {
          !isRecordMode && (
            <div className='start-recorde' onClick={() => { setIsRecordMode(true) }}>
              <img src={RecordIcon} />
            </div>
          )
        }
        {
          isRecordMode && (
            <AudioRecorder
              onCancel={onCancel}
              onDataAvailable={onDataReady}
              onPermissionDenied={onPermissionDenied}
              isLogging
            />
          )
        }
      </div>
    </div>
  )
}

export default App
