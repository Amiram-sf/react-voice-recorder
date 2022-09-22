import { isDevEnv } from "./utils";

enum ErrorLevel {
    Error = 'Error',
    Info = 'Info',
    Warn = 'Warn'
}

interface ILog {
    time: Date
    message: any
    level: ErrorLevel
}

const Logger = {
    isLog: true,
    error: function (message: any) {
        if (isDevEnv && this.isLog)
            console.error({
                level: ErrorLevel.Error,
                message,
                time: new Date()
            } as ILog);
    },
    info: function (message: any) {
        if (isDevEnv && this.isLog)
            console.info({
                level: ErrorLevel.Info,
                message,
                time: new Date()
            } as ILog);
    },
    warn: function (message: any) {
        if (isDevEnv && this.isLog)
            console.warn({
                level: ErrorLevel.Warn,
                message,
                time: new Date()
            } as ILog);
    }
}

export { Logger }