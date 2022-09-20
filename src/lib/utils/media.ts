export const mediaSupported = () => {
    // safari used to not support this
    // ...even if it supported media recorder
    if (!MediaRecorder.isTypeSupported) {
        return "audio/mp4";
    } else if (MediaRecorder.isTypeSupported("audio/webm")) {
        return "audio/webm";
    } else {
        return "audio/mp4";
    }
}