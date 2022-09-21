import { ReactElement } from "react"
import { IIcon } from "../../utils/base-models"

function PlayIcon({
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
            viewBox="0 0 215.603 246.404"
        >
            <path
                d="M480.2,284.48a23.092,23.092,0,0,1-11.355,19.891l-169.13,99.941c-.059.039-.121.066-.172.105l-.1.055A23.1,23.1,0,0,1,264.6,384.581v-200.2A23.089,23.089,0,0,1,299.445,164.5v-.008l.1.051a1.307,1.307,0,0,0,.172.113l169.13,99.934A23.1,23.1,0,0,1,480.2,284.479"
                transform="translate(-264.597 -161.279)"
                fillRule="evenodd"
            />
        </svg>
    )
}

export default PlayIcon