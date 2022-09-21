import { ReactElement } from 'react'
import { IIcon } from '../../utils/base-models'

function PauseIcon({
    color = 'white',
    height = 16,
    width = 16
}: IIcon): ReactElement {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={color}
            viewBox="0 0 454.16 532.56"
        >
            <g
                transform="translate(-363.109 -207.976)">
                <path
                    d="M269.36,14H144.48a21.865,21.865,0,0,0-21.84,21.84V524.72a21.865,21.865,0,0,0,21.84,21.84H268.8a21.865,21.865,0,0,0,21.84-21.84V35.84c0-12.32-9.52-21.84-21.281-21.84Z"
                    transform="translate(240.469 193.976)"
                />
                <path
                    d="M555.52,14H430.64A21.865,21.865,0,0,0,408.8,35.84V524.72a21.865,21.865,0,0,0,21.84,21.84H554.96a21.865,21.865,0,0,0,21.84-21.84V35.84c0-12.32-9.519-21.84-21.281-21.84Z"
                    transform="translate(240.469 193.976)"
                />
            </g>
        </svg>
    )
}

export default PauseIcon