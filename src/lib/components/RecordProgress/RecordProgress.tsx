import { ReactElement, useRef } from "react"
import { ITime } from "../../utils/base-models"
import { IsShow } from "../IsShow/IsShow"
import PlayRecorded from "./PlayRecorded"
import RecordingProgress from "./RecordingProgress"

interface IRecordingProgress {
    enableTimer: boolean
    pasue: boolean
    voiceFile?: Blob[]
    onUpdateTime?: (value: number) => void
}

function RecordProgress({
    enableTimer,
    pasue,
    voiceFile,
    onUpdateTime
}: IRecordingProgress): ReactElement {

    const currentTime = useRef<number>(0)

    const updateTime = (value: number) => {

        currentTime.current = value
        onUpdateTime?.(value)
    }

    return (
        <div className="recording-progress">
            <IsShow isShow={pasue}>
                <PlayRecorded
                    defualtTime={currentTime.current}
                    voiceFile={voiceFile}
                />
            </IsShow>
            <IsShow isShow={!pasue}>
                <RecordingProgress
                    currentTime={currentTime.current}
                    enableTimer={enableTimer}
                    pasue={pasue}
                    updateTime={updateTime}
                />
            </IsShow>
        </div>
    )
}

export default RecordProgress