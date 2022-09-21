import { ReactElement } from 'react'
import { IIcon } from '../../utils/base-models'

function PauseVoiceIcon({
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
            viewBox="0 0 560.004 560.004"
        >
            <g
                transform="translate(-297 -297)">
                <path
                    d="M350,0A280.007,280.007,0,1,0,547.99,82.012,279.992,279.992,0,0,0,350,0Zm0,528.89a249.166,249.166,0,1,1,175.908-72.978A248.882,248.882,0,0,1,350,528.89Z"
                    transform="translate(227.002 297)"
                />
                <path
                    d="M303.33,171.11a15.557,15.557,0,0,0-15.555,15.559v186.66a15.557,15.557,0,0,0,31.113,0V186.669A15.564,15.564,0,0,0,303.33,171.11Z"
                    transform="translate(227.002 297)" />
                <path d="M396.67,171.11a15.564,15.564,0,0,0-15.559,15.559v186.66a15.557,15.557,0,1,0,31.113,0V186.669A15.557,15.557,0,0,0,396.67,171.11Z"
                    transform="translate(227.002 297)"
                />
            </g>
        </svg>
    )
}

export default PauseVoiceIcon