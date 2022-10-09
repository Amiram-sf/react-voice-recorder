# React Voice Recorder.

A package for recording voice in react.

**Demo Link:** [react voice recorder](https://react-voice-recorder-website.vercel.app/)
:warning: **Warning** :warning: This package work in localhost AND secure domain (https).
:warning: **Warning** :warning: You must mount the component when you want to start the record and unMount the component when the record is complete.


### Future Feature.

* control seek icon in playback voice  ( with mouse or finger ).
* show progress play in playback voice.
* callback function for the requested timer.
* possibility for changing icons.

### How to use and props.

------------

|  Name | Required | Type |Description |
| ------------ | ------------ | ------------ |  ------------ |
| isLogging  | false | boolean | Log error while using recorder in develop mode , default : false  |
| audioBitsPerSecond  | false  | number | Set audioBitsPerSecond for recording voice  |
| onPermissionDenied  | true  | function  |Function  |
| onCancel  | true  | function  |Function  |
| onDataAvailable  | true  | function  |Function  |


**Sample :**



    import { useState } from 'react'
    import './App.css'
    
    import { AudioRecorder, IDataAvailable } from "@amirseifi/react-voice-recorder"
    import "@amirseifi/react-voice-recorder/dist/style.css"
    
    function App() {
    
      const [isRecordMode, setIsRecordMode] = useState(false)
      const [audioSrc, setAudioSrc] = useState("")
    
      const onDataReady = (value: IDataAvailable) => {
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
    
          <div className='chat-control'>
            <div className='chat-control-container'>
    
    
              {
                !isRecordMode && (
                  <button onClick={() => { setIsRecordMode(!isRecordMode) }}>click to record</button>
                )
              }
              <div className='voice-recorder'>
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
          </div>
        </div>
      )
    }
    
    export default App
    

### Contributing

------------


Feel free to submit a PR if you found a bug (I might've missed many! 😀) or if you want to enhance it further.

Thanks!. Happy Recording!
