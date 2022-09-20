function wave(stream: MediaStream, canvasId: string = '#canvas') {
    window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser()
    const mediaStreamSource = audioContext.createMediaStreamSource(stream)
    mediaStreamSource.connect(analyser)
    analyser.fftSize = 256;


    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);

        const bufferLength = analyser.frequencyBinCount;

        const dataArray = new Uint8Array(bufferLength);

        analyser.getByteFrequencyData(dataArray);

        const canvas: HTMLCanvasElement | null = document.querySelector(canvasId)
        if (canvas === null) return

        const width = canvas.width;
        const height = canvas.height;
        const barWidth = 10;

        const canvasContext = canvas.getContext('2d');
        if (canvasContext === null) return

        canvasContext.clearRect(0, 0, width, height);
        let x = 0;
        dataArray.forEach((item, index, array) => {
            const heightItem = item / 255 * height;
            let color = '#969696'

            const el = document.querySelector('.react-voice-recorder')
            if (el)
                color = getComputedStyle(el).getPropertyValue('--grey-color')

            canvasContext.strokeStyle = color;
            x = x + barWidth;
            canvasContext.beginPath();
            canvasContext.lineCap = "round";
            canvasContext.lineWidth = 5;
            canvasContext.moveTo(x, (height - heightItem) / 2);
            canvasContext.lineTo(x, ((height - heightItem) / 2) + heightItem);
            canvasContext.stroke();
        })
    }




    return {
        drawVisualizer
    };
}

export { wave }