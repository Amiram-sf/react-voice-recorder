export const mediaSupported = () => {
    if (!MediaRecorder.isTypeSupported) {
        return "audio/mp4";
    } else if (MediaRecorder.isTypeSupported("audio/webm")) {
        return "audio/webm";
    } else {
        return "audio/mp4";
    }
}