import { useState } from 'react'
import './App.css'
import { AudioRecorder } from './lib'
import { IDataAvailable } from './lib/containers/AudioRecorder/AudioRecorder'

function App() {
  const [count, setCount] = useState(0)

  const onDataReady = (value: IDataAvailable) => {
    console.log(value);

  }

  return (
    <div className="App">
      <div className='voice-recorder'>
        <AudioRecorder
          onDataAvailable={onDataReady}
        />
      </div>
    </div>
  )
}

export default App
