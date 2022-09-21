import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { ITime } from '../../utils/base-models'
import { mediaSupported } from '../../utils/media'
import { WaveForm } from '../../utils/waveform'
import PauseIcon from '../Icons/PauseIcon'
import PlayIcon from '../Icons/PlayIcon'
import { IsShow } from '../IsShow/IsShow'
import { CountDownTimer } from '../Timer/CountDownTimer'
import { Wave } from '../Wave/Wave'

interface IPlayRecorded {
    defualtTime: ITime
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
            const drawWave = await WaveForm.setBlob(new Blob(voiceFile, { type: mediaSupported() }))
            drawWave()
        } catch (e) {

        }
    }

    useEffect(() => {

        const reader = new FileReader()
        reader.onload = (event) => {
            if (event.target !== null)
                setVoiceURL(event.target.result as string);
        }
        reader.readAsDataURL(new Blob(voiceFile, { type: mediaSupported() }))

        if (voiceFile) {
            drawWaveForm(voiceFile)
        }
    }, [voiceFile])

    const togglePlayback = () => {
        setIsPlaying(!isPlaying)
        if (audio.current === null) return
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