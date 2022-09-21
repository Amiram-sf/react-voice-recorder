import { FC, useEffect, useRef, useState } from "react"
import { ITime } from "../../utils/base-models"

interface ICountDownTimer {
    pause: boolean
    defualtTime: ITime
    onFinish: () => void
}

export const CountDownTimer: FC<ICountDownTimer> = ({
    pause,
    defualtTime,
    onFinish
}) => {

    const timeInterval = useRef<any>(null)
    const [time, setTime] = useState(defualtTime)

    const onUpdateTime = (defualtTime?: ITime) => {
        setTime((prevData) => {
            const { seconds, minute } =
                prevData.minute !== 0 || prevData.seconds !== 0 ?
                    prevData :
                    (defualtTime ? defualtTime : prevData);
            const secondsTemp = seconds === 0 ? 59 : seconds - 1;
            const minuteTemp = minute === 0 && seconds === 0 ? 0 : (seconds === 0 ? minute - 1 : minute);
            if (secondsTemp === 0 && minute === 0) {
                onFinish()
                if (timeInterval.current) {
                    clearInterval(timeInterval.current)
                }
            }
            return {
                seconds: secondsTemp,
                minute: minuteTemp,
            }
        })
    }

    useEffect(() => {
        if (
            JSON.stringify(defualtTime) !== JSON.stringify(time) &&
            pause
        ) {
            onUpdateTime(defualtTime)
        }
    }, [defualtTime, pause])

    useEffect(() => {
        if (!pause) {
            timeInterval.current = setInterval(onUpdateTime, 1000)

            return () => {
                return clearInterval(timeInterval.current)
            }
        }
        if (pause && timeInterval.current) {
            clearInterval(timeInterval.current)
        }
    }, [pause])


    const formatTime = (time: number) => {
        if (time < 10) {
            return `0${time}`
        } else {
            return time;
        }
    }



    return (
        <time className="timer count-down">
            <span>
                {formatTime(time.minute)}
            </span>
            :
            <span>
                {formatTime(time.seconds)}
            </span>
        </time>
    )
}