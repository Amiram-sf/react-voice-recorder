import { ReactElement } from 'react'
import { ITime } from '../../utils/base-models'
import { Timer } from '../Timer/Timer'
import { Wave } from '../Wave/Wave'

interface IRecordingProgress {
    enableTimer: boolean
    pasue: boolean
    updateTime: (value: ITime) => void
    currentTime: ITime
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