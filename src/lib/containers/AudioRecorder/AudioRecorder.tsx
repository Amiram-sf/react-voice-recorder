import { IMedia, MediaCore } from 'media-core';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Remove } from '../../components/Buttons/Remove/Remove';
import { Send } from '../../components/Buttons/Send/Send';
import { TogglePlay } from '../../components/Buttons/TogglePlay/TogglePlay';
import RecordProgress from '../../components/RecordProgress/RecordProgress';
import { Logger } from '../../utils/logger';
import { mediaSupported } from '../../utils/media';
import { WaveForm } from '../../utils/waveform';
import './../../styles/audio-recorder.css';

export interface IDataAvailable {
    value: Blob
    time: number
}

interface IAudioRecorder {
    onDataAvailable: (value: IDataAvailable) => void
    onCancel: () => void
    onPermissionDenied: () => void
    isLogging?: boolean,
    audioBitsPerSecond?: number
}

function AudioRecorder({
    onDataAvailable,
    onCancel,
    onPermissionDenied,
    isLogging = false,
    audioBitsPerSecond
}: IAudioRecorder): ReactElement {

    const currentTime = useRef<number>(0)
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const sendDataStatus = useRef<'none' | 'send'>('none')
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


        if (sendDataStatus.current === 'send') {
            onDataAvailable({
                time: currentTime.current,
                value: new Blob(mediaChunks.current, { type: mediaSupported() })
            })
            sendDataStatus.current = 'none';
        }
    }

    const getMediaRecorder = async () => {
        try {
            const mediaConfig: IMedia = {
                Constraints: {
                    audio: true
                },
                mediaRecorderOptions: {
                    mimeType: mediaSupported(),
                    audioBitsPerSecond
                }
            }

            mediaRecorder.current = await MediaCore(mediaConfig);
            waveForm.current = WaveForm.setStream(mediaRecorder.current.stream)
            mediaRecorder.current.addEventListener('dataavailable', onAudioDataAvailable)
            setEnableTimer(true)
            startRecording()
            waveForm.current.startVisualizer()
        } catch (e) {
            Logger.error(e)
            onPermissionDenied()
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
                mediaChunks.current = []
                mediaRecorder.current.start(50)
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
                waveForm.current?.stopVisualizer()
                setPasue(true)
                mediaRecorder.current?.stop()
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
                waveForm.current?.stopVisualizer()
                mediaRecorder.current?.pause()
                setPasue(true)
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
                setPasue(false)
                waveForm.current?.startVisualizer()
                mediaRecorder.current?.resume()
            } catch (e) {
                Logger.error(e)
            }
        }
    }

    const updateTime = (value: number) => {
        currentTime.current = value
    }

    const onSendData = () => {
        sendDataStatus.current = 'send'
        stopRecording()
    }


    return (
        <div id='react-voice-recorder'>
            <div className='cancel-recorder'>
                <Remove
                    onClick={() => {
                        stopRecording()
                        onCancel()
                    }}
                />
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