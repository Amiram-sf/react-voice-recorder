import { ITime } from "./base-models"

interface IFullTime extends ITime {
    millisecond: number
}

export const isDevEnv = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export function millisecondToTime(millisecond: number): IFullTime {
    return {
        millisecond: +(millisecond % 1000).toFixed(0),
        minute: +(Math.floor((millisecond / 1000 / 60) << 0)).toFixed(0),
        seconds: +(Math.floor((millisecond / 1000) % 60)).toFixed(0)
    }
}