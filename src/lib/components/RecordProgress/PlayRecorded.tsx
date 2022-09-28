import { ReactElement, useEffect, useRef, useState } from 'react'
import { Logger } from '../../utils/logger'
import { mediaSupported } from '../../utils/media'
import { WaveFormFromBlob } from '../../utils/waveform'
import PauseIcon from '../Icons/PauseIcon'
import PlayIcon from '../Icons/PlayIcon'
import { IsShow } from '../IsShow/IsShow'
import { CountDownTimer } from '../Timer/CountDownTimer'
import { Wave } from '../Wave/Wave'

interface IPlayRecorded {
    defualtTime: number
    voiceFile?: Blob[]
}

function PlayRecorded({
    defualtTime,
    voiceFile
}: IPlayRecorded): ReactElement {

    const audio = useRef<HTMLAudioElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [voiceURL, setVoiceURL] = useState<string>("")

    const drawWaveForm = async (voiceFile: Blob[]) => {
        try {
            const waveFormFromBlob = new WaveFormFromBlob()
            waveFormFromBlob
                .setBlobFile(new Blob(voiceFile, { type: mediaSupported() }))
                .then(_this => {
                    _this.draw()
                })
        } catch (e) {
            Logger.error(e)
        }
    }

    useEffect(() => {

        const reader = new FileReader()
        reader.onload = (event) => {
            if (event.target !== null)
                setVoiceURL(event.target.result as string);
        }
        reader.readAsDataURL(new Blob(voiceFile, { type: mediaSupported() }))

        if (voiceFile !== undefined && voiceFile.length > 0) {

            drawWaveForm(voiceFile)
        }
    }, [voiceFile])

    const togglePlayback = () => {
        if (audio.current === null) return
        setIsPlaying(!isPlaying)
        if (!isPlaying) {
            audio.current.play()
            audio.current.muted = false;
        } else {
            audio.current.pause()
        }
    }

    return (
        <div className='play-recorded-voice'>
            <div
                className='actions'
                onClick={() => {
                    togglePlayback()
                }}
            >
                <IsShow isShow={isPlaying}>
                    <PauseIcon
                        color='var(--grey-color)'
                    />
                </IsShow>
                <IsShow isShow={!isPlaying}>
                    <PlayIcon
                        color='var(--grey-color)'
                    />
                </IsShow>
            </div>
            <Wave />
            <CountDownTimer
                defualtTime={defualtTime}
                pause={!isPlaying}
                onFinish={() => {
                    setIsPlaying(false)
                }}
            />

            <audio ref={audio} muted={false} src={voiceURL} id="react-voice-recorder-audio" />
        </div>
    )
}

export default PlayRecorded