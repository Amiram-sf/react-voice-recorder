import { FC, ReactElement } from "react"
import { Timer } from "../Timer/Timer"
import { Wave } from "../Wave/Wave"

interface IRecordingProgress {
    enableTimer: boolean
    pasue: boolean
}

function RecordingProgress({ enableTimer, pasue }: IRecordingProgress): ReactElement {
    return (
        <div className="recording-progress">
            <Timer
                enable={enableTimer}
                pause={pasue}
            />
            <Wave />
        </div>
    )
}

export default RecordingProgress