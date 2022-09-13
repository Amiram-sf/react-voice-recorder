import { Remove } from '../../components/Buttons/Remove/Remove';
import { Send } from '../../components/Buttons/Send/Send';
import { TogglePlay } from '../../components/Buttons/TogglePlay/TogglePlay';
import { Timer } from '../../components/Timer/Timer';
import { Wave } from '../../components/Wave/Wave';
import './../../styles/audio-recorder.css';

const AudioRecorder = () => {
    return (
        <div className='react-voice-recorder'>
            <div className='cancel-recorder'>
                <Remove />
            </div>
            <div className='wave-controls'>
                <Timer />
                <Wave />
            </div>
            <div className='play-controls'>
                <TogglePlay />
                <Send />
            </div>
        </div>
    )
}

export default AudioRecorder