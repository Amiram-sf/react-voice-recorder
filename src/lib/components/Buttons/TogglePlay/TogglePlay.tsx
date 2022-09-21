import { FC } from "react"
import PauseVoiceIcon from "../../Icons/PauseVoiceIcon"
import ResumeVoiceIcon from "../../Icons/ResumeVoiceIcon"
import { IsShow } from "../../IsShow/IsShow"

interface ITogglePlay {
    onClick: () => void
    isRecordeing: boolean
}

export const TogglePlay: FC<ITogglePlay> = ({
    onClick,
    isRecordeing
}) => {
    return (
        <button type='button' className='button' onClick={() => {
            onClick()
        }}>
            <IsShow isShow={isRecordeing}>
                <PauseVoiceIcon
                    color="var(--d-color)"
                    width="2.3rem"
                    height="2.3rem"
                />
            </IsShow>
            <IsShow isShow={!isRecordeing}>
                <ResumeVoiceIcon
                    color="var(--d-color)"
                    width="1.3rem"
                    height="2.3rem"
                />
            </IsShow>
        </button>
    )
}