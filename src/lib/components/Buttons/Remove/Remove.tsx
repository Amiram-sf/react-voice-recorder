import { FC } from "react"
import RemoveVoiceIcon from "../../Icons/RemoveVoiceIcon"

interface IRemove {
    onClick?: () => void
}

export const Remove: FC<IRemove> = ({
    onClick
}) => {
    return (
        <button onClick={onClick} type="button" className="button">
            <RemoveVoiceIcon
                width="1.5rem"
                height="1.5rem"
                color="var(--grey-color)"
            />
        </button>
    )
}