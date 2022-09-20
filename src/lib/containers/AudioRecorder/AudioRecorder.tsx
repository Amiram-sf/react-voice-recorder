import { IMedia, MediaCore } from 'media-core';
import { useEffect, useRef, useState } from 'react';
import { Remove } from '../../components/Buttons/Remove/Remove';
import { Send } from '../../components/Buttons/Send/Send';
import { TogglePlay } from '../../components/Buttons/TogglePlay/TogglePlay';
import RecordingProgress from '../../components/RecordingProgress/RecordingProgress';
import { mediaSupported } from '../../utils/media';
import { wave } from '../../utils/waveform';
import './../../styles/audio-recorder.css';

const AudioRecorder = () => {

    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const asd = useRef<string>("")
    const mediaChunks = useRef<Blob[]>([])

    const [pasue, setPasue] = useState(true)
    const [enableTimer, setEnableTimer] = useState(false)

    const onDataAvailable = (data: BlobEvent) => {
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
            wave(mediaRecorder.current.stream).drawVisualizer()
            mediaRecorder.current.addEventListener('dataavailable', onDataAvailable)
            setEnableTimer(true)
            startRecording()
        } catch (e) {
            console.log(e);

        }
    }

    useEffect(() => {

        if (asd.current === "sac") return
        asd.current = "sac"
        if (mediaRecorder.current == null) {
            console.log('hello');

            getMediaRecorder()
            return () => {
                mediaRecorder.current?.removeEventListener('dataavailable', onDataAvailable)
            }
        }
    }, [])

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
                console.log(e);

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
            } catch (e) {
                console.log(e);

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
            } catch (e) {
                console.log(e);

            }
        }
    }

    const resumeRecording = () => {
        console.log('mediaRecorder.current?.state', mediaRecorder.current?.state);

        if (
            isValidMediaRecorder() &&
            mediaRecorder.current?.state === 'paused'
        ) {
            try {
                mediaRecorder.current?.resume()
                setPasue(false)
            } catch (e) {
                console.log(e);

            }
        }
    }


    return (
        <div className='react-voice-recorder'>
            <div className='cancel-recorder'>
                <Remove onClick={() => { stopRecording() }} />
            </div>
            <div className='wave-controls'>
                <RecordingProgress
                    enableTimer={enableTimer}
                    pasue={pasue}
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
                <Send />
            </div>
        </div>
    )
}

export default AudioRecorder