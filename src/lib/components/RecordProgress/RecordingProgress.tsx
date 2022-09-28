import { ReactElement } from 'react'
import { Timer } from '../Timer/Timer'
import { Wave } from '../Wave/Wave'

interface IRecordingProgress {
    enableTimer: boolean
    pasue: boolean
    updateTime: (value: number) => void
    currentTime: number
}

function RecordingProgress({
    currentTime,
    enableTimer,
    pasue,
    updateTime
}: IRecordingProgress): ReactElement {
    return (
        <>
            <Timer
                enable={enableTimer}
                pause={pasue}
                updateTime={updateTime}
                defualtTime={currentTime}
            />
            <Wave />
        </>
    )
}

export default RecordingProgress