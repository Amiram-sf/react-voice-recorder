import { IMedia, MediaCore } from 'media-core';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Remove } from '../../components/Buttons/Remove/Remove';
import { Send } from '../../components/Buttons/Send/Send';
import { TogglePlay } from '../../components/Buttons/TogglePlay/TogglePlay';
import RecordProgress from '../../components/RecordProgress/RecordProgress';
import { ITime } from '../../utils/base-models';
import { Logger } from '../../utils/logger';
import { mediaSupported } from '../../utils/media';
import { WaveForm } from '../../utils/waveform';
import './../../styles/audio-recorder.css';

export interface IDataAvailable {
    value: Blob
    time: ITime
}

interface IAudioRecorder {
    onDataAvailable: (value: IDataAvailable) => void
    onCancel: () => void
    isLogging?: boolean
}

function AudioRecorder({
    onDataAvailable,
    onCancel,
    isLogging = false
}: IAudioRecorder): ReactElement {

    const currentTime = useRef<ITime>({
        minute: 0,
        seconds: 0
    })
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const asd = useRef<string>("")
    const mediaChunks = useRef<Blob[]>([])
    const waveForm = useRef<{
        startVisualizer: () => void,
        stopVisualizer: () => void
    } | null>(null)

    const [pasue, setPasue] = useState(true)
    const [enableTimer, setEnableTimer] = useState(false)

    const onAudioDataAvailable = (data: BlobEvent) => {
        mediaChunks.current.push(data.data)

    }

    const getMediaRecorder = async () => {
        try {
            const mediaConfig: IMedia = {
                Constraints: {
                    audio: true
                },
                mediaRecorderOptions: {
                    mimeType: mediaSupported(),
                    audioBitsPerSecond: 3200000
                }
            }

            mediaRecorder.current = await MediaCore(mediaConfig);
            waveForm.current = WaveForm.setStream(mediaRecorder.current.stream)
            waveForm.current.startVisualizer()
            mediaRecorder.current.addEventListener('dataavailable', onAudioDataAvailable)
            setEnableTimer(true)
            startRecording()
        } catch (e) {
            Logger.error(e)
        }
    }

    useEffect(() => {

        if (asd.current === "sac") return
        asd.current = "sac"
        if (mediaRecorder.current == null) {

            getMediaRecorder()
            return () => {
                mediaRecorder.current?.removeEventListener('dataavailable', onAudioDataAvailable)
            }
        }
    }, [])

    useEffect(() => {
        Logger.isLog = isLogging;
    }, [isLogging])


    const isValidMediaRecorder = () => {
        return !!mediaRecorder.current && mediaRecorder.current.stream.active
    }

    const startRecording = () => {
        if (
            isValidMediaRecorder() &&
            mediaRecorder.current?.state === 'inactive'
        ) {
            try {
                mediaRecorder.current.start(1000)
                setPasue(false)
            } catch (e) {
                Logger.error(e)
            }
        }
    }

    const stopRecording = () => {
        if (
            isValidMediaRecorder() &&
            mediaRecorder.current?.state !== 'inactive'
        ) {
            try {
                mediaRecorder.current?.stop()
                mediaChunks.current = []
                setPasue(true)
                onCancel()
            } catch (e) {
                Logger.error(e)
            }
        }
    }

    const pauseRecording = () => {
        if (
            isValidMediaRecorder() &&
            mediaRecorder.current?.state === 'recording'
        ) {
            try {
                mediaRecorder.current?.pause()
                setPasue(true)
                waveForm.current?.stopVisualizer()
            } catch (e) {
                Logger.error(e)
            }
        }
    }

    const resumeRecording = () => {

        if (
            isValidMediaRecorder() &&
            mediaRecorder.current?.state === 'paused'
        ) {
            try {
                mediaRecorder.current?.resume()
                setPasue(false)
                waveForm.current?.startVisualizer()
            } catch (e) {
                Logger.error(e)
            }
        }
    }

    const updateTime = (value: ITime) => {
        currentTime.current = value
    }

    const onSendData = () => {
        onDataAvailable({
            time: currentTime.current,
            value: new Blob(mediaChunks.current, { type: mediaSupported() })
        })
        stopRecording()
    }


    return (
        <div className='react-voice-recorder'>
            <div className='cancel-recorder'>
                <Remove onClick={() => { stopRecording() }} />
            </div>
            <div className='wave-controls'>
                <RecordProgress
                    enableTimer={enableTimer}
                    pasue={pasue}
                    voiceFile={mediaChunks.current}
                    onUpdateTime={updateTime}
                />
            </div>
            <div className='play-controls'>
                <TogglePlay
                    isRecordeing={mediaRecorder.current?.state === "recording"}
                    onClick={() => {
                        if (mediaRecorder.current?.state === "recording") {
                            pauseRecording()
                        } else if (mediaRecorder.current?.state === "paused") {
                            resumeRecording()
                        }
                    }}
                />
                <Send onClick={onSendData} />
            </div>
        </div>
    )
}

export default AudioRecorder