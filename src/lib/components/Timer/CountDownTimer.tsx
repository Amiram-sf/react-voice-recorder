import { FC, useEffect, useRef, useState } from "react"
import { ITime } from "../../utils/base-models"
import { millisecondToTime } from "../../utils/utils"

interface ICountDownTimer {
    pause: boolean
    defualtTime: number
    onFinish: () => void
}

export const CountDownTimer: FC<ICountDownTimer> = ({
    pause,
    defualtTime,
    onFinish
}) => {

    const timeInterval = useRef<any>(null)
    const [time, setTime] = useState<ITime>({
        minute: 0,
        seconds: 0
    })

    useEffect(() => {
        const { minute, seconds } = time
        if (minute === 0 && seconds === 0) {
            onFinish()
        }
    }, [time])


    const onUpdateTime = () => {
        setTime((prevData) => {
            const { seconds, minute } = prevData;
            const secondsTemp = seconds === 0 ? 59 : seconds - 1;
            const minuteTemp = minute === 0 && seconds === 0 ? 0 : (seconds === 0 ? minute - 1 : minute);
            if (secondsTemp === 0 && minute === 0) {
                if (timeInterval.current) {
                    clearInterval(timeInterval.current)
                }
            }
            return {
                seconds: secondsTemp,
                minute: minuteTemp
            }
        })
    }

    const startCountDown = () => {
        return setInterval(onUpdateTime, 1000)
    }

    useEffect(() => {
        const timeTemp = millisecondToTime(defualtTime)
        
        setTime({ ...timeTemp })

        if (!pause && defualtTime > 0) {

            if (timeTemp.millisecond > 0) {
                setTimeout(() => {
                    timeInterval.current = startCountDown()
                }, timeTemp.millisecond);
            } else {

                timeInterval.current = startCountDown()
            }


            return () => {
                if (timeInterval.current)
                    clearInterval(timeInterval.current)
            }
        }
        if (pause && timeInterval.current) {
            clearInterval(timeInterval.current)
        }
    }, [pause, defualtTime])

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