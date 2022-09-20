import { FC, useState } from "react"
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.3rem"
                    height="2.3rem"
                    fill="var(--d-color)"
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
            </IsShow>
            <IsShow isShow={!isRecordeing}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.3rem"
                    height="2.3rem"
                    viewBox="0 0 350.713 490.01"
                    fill="var(--d-color)"
                >
                    <path
                        d="M345.7,385h8.609c55.371,0,100.7-45.324,100.7-100.7V135.69c0-55.371-45.324-100.7-100.7-100.7H345.7c-55.371,0-100.7,45.324-100.7,100.7V284.3C245,339.671,290.324,385,345.7,385Zm-65.7-249.3A65.767,65.767,0,0,1,345.7,70h8.609A65.767,65.767,0,0,1,420,135.7V284.31a65.767,65.767,0,0,1-65.7,65.7H345.7a65.767,65.767,0,0,1-65.7-65.7ZM472.505,490h-87.5V451.852c70-14.664,140.35-82.32,140.35-171.85a17.623,17.623,0,0,0-35.246,0c0,82.426-57.609,140-140.04,140s-140.04-57.574-140.04-140a17.506,17.506,0,0,0-17.5-17.5c-9.66,0-17.887,7.84-17.887,17.5,0,89.531,70.352,157.22,140.35,171.85V490h-87.5a17.5,17.5,0,0,0,0,35h245a17.5,17.5,0,1,0,0-35Z"
                        transform="translate(-174.642 -34.99)"
                    />
                </svg>
            </IsShow>
        </button>
    )
}