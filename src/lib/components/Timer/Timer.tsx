import { FC, useEffect, useRef, useState } from "react"
import { ITime } from "../../utils/base-models"
import { millisecondToTime } from "../../utils/utils"

interface ITimer {
    enable?: boolean
    pause?: boolean
    defualtTime?: number
    updateTime: (value: number) => void
}

export const Timer: FC<ITimer> = ({
    enable = false,
    pause = false,
    defualtTime = 0,
    updateTime
}) => {

    const startTimeToRecord = useRef<number>(0)
    const timeInterval = useRef<any>(null)
    const [time, setTime] = useState<ITime>({
        minute: 0,
        seconds: 0
    })

    const getTime = (startTime: number) => {
        return new Date().getTime() - startTime;
    }

    const onUpdateTime = (defualtTime?: ITime) => {
        setTime((prevData) => {
            const { seconds, minute } = defualtTime ? defualtTime : prevData;
            const secondsTemp = seconds === 59 ? 0 : seconds + 1;
            const minuteTemp = minute === 59 && seconds === 59 ? 0 : (seconds === 59 ? minute + 1 : minute);
            const timeInMillisecondsTemp = getTime(startTimeToRecord.current)
            const timeTemp: ITime = {
                seconds: secondsTemp,
                minute: minuteTemp
            }
            updateTime(timeInMillisecondsTemp)
            return { ...timeTemp }
        })
    }

    const startTimer = () => {
        return setInterval(onUpdateTime, 1000)
    }

    useEffect(() => {
        if (enable && !pause) {


            startTimeToRecord.current = new Date().getTime() - defualtTime;
            if (
                defualtTime !== undefined &&
                defualtTime !== 0
            ) {
                const timeTemp = millisecondToTime(defualtTime);
                setTime({
                    ...timeTemp
                })
                setTimeout(() => {
                    onUpdateTime()
                    timeInterval.current = startTimer()
                }, timeTemp.millisecond);

            } else {
                timeInterval.current = startTimer()
            }

            return () => {
                const timeInMillisecondsTemp = getTime(startTimeToRecord.current)
                updateTime(timeInMillisecondsTemp)
                if (timeInterval.current)
                    clearInterval(timeInterval.current)
            }
        }
        if ((!enable || pause) && timeInterval.current) {
            clearInterval(timeInterval.current)
        }
    }, [enable, pause, defualtTime])


    const formatTime = (time: number) => {
        if (time < 10) {
            return `0${time}`
        } else {
            return time;
        }
    }



    return (
        <time className="timer">
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