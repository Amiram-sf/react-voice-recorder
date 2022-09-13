import { FC, useEffect, useRef, useState } from "react"

interface ITimer {
    enable?: boolean
    pause?: boolean
}

export const Timer: FC<ITimer> = ({
    enable = false,
    pause = false
}) => {

    const timeInterval = useRef<any>(null)
    const [time, setTime] = useState({
        hour: 0,
        minute: 0,
        seconds: 0
    })

    const updateTime = () => {
        setTime((prevData) => {
            const { seconds, minute, hour } = prevData;
            const secondsTemp = seconds === 59 ? 0 : seconds + 1;
            const minuteTemp = minute === 59 && seconds === 59 ? 0 : (seconds === 59 ? minute + 1 : minute);
            const hourTemp = minute === 59 ? hour + 1 : hour;
            return {
                seconds: secondsTemp,
                minute: minuteTemp,
                hour: hourTemp,
            }
        })
    }

    useEffect(() => {
        if (enable && !pause) {
            timeInterval.current = setInterval(updateTime, 1000)

            return () => {
                return clearInterval(timeInterval.current)
            }
        }
    }, [enable, pause])


    useEffect(() => {
        if ((!enable || pause) && timeInterval.current) {
            clearInterval(timeInterval.current)
        }
    }, [enable, pause])


    const formatTime = (time: number) => {
        if (time < 10) {
            return `0${time}`
        } else {
            return time;
        }
    }



    return (
        <p>
            <span>
                {formatTime(time.minute)}
            </span>
            :
            <span>
                {formatTime(time.seconds)}
            </span>
        </p>
    )
}