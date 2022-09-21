import { Constants } from './constants';


function waveForm() {
    const canvasId: string = Constants.canvasId;
    window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    let color = '#969696'

    const el = document.querySelector('.react-voice-recorder')
    if (el)
        color = getComputedStyle(el).getPropertyValue('--grey-color')

    function setStream(stream: MediaStream) {
        let pause: boolean = false;
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256;
        const mediaStreamSource = audioContext.createMediaStreamSource(stream)
        mediaStreamSource.connect(analyser)

        function drawVisualizer() {
            if (pause) return

            requestAnimationFrame(drawVisualizer);

            const bufferLength = analyser.frequencyBinCount;

            const dataArray = new Uint8Array(bufferLength);

            analyser.getByteFrequencyData(dataArray);

            const canvas: HTMLCanvasElement | null = document.querySelector(canvasId)
            if (canvas === null) return

            const width = canvas.width;
            const height = canvas.height;
            const barWidth = 8;

            const canvasContext = canvas.getContext('2d');
            if (canvasContext === null) return

            canvasContext.clearRect(0, 0, width, height);
            let x = 0;
            dataArray.forEach((item, index, array) => {
                const heightItem = item / 255 * height;
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

        function stopVisualizer() {
            pause = true;
        }

        function startVisualizer() {
            pause = false;
            drawVisualizer()
        }

        return {
            startVisualizer,
            stopVisualizer
        }
    }


    async function setBlob(data: Blob): Promise<any> {
        try {
            const arraybuffer = await data.arrayBuffer()
            const audioBuffer: AudioBuffer = await audioContext.decodeAudioData(arraybuffer)

            let normalizedData: number[] = normalizeData(filterData(audioBuffer));

            function filterData(audioBuffer: AudioBuffer) {
                const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
                const samples = 30; // Number of samples we want to have in our final data set
                const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
                const filteredData = [];
                for (let i = 0; i < samples; i++) {
                    let blockStart = blockSize * i; // the location of the first sample in the block
                    let sum = 0;
                    for (let j = 0; j < blockSize; j++) {
                        sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
                    }
                    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
                }
                return filteredData;
            }

            function normalizeData(filteredData: number[]) {
                const multiplier = Math.pow(Math.max(...filteredData), -1);
                return filteredData.map(n => n * multiplier);
            }

            function draw() {
                // Set up the canvas
                const canvas: HTMLCanvasElement | null = document.querySelector(canvasId);
                if (canvas === null) return

                const ctx = canvas.getContext("2d");
                if (ctx === null) return

                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                let x = 0
                for (let i = 0; i < normalizedData.length; i++) {
                    x += 9.9;
                    let height = (normalizedData[i] >= 1 ? 0.98 : (normalizedData[i] <= 0 ? 0.02 : normalizedData[i])) * canvas.height;

                    drawLineSegment(ctx, x, height);
                }
            };

            function drawLineSegment(canvasContext: CanvasRenderingContext2D, x: number, height: number) {
                canvasContext.lineWidth = 5;

                canvasContext.strokeStyle = color;
                canvasContext.beginPath();
                canvasContext.lineCap = "round";

                canvasContext.moveTo(x, (canvasContext.canvas.height - height) / 2);
                canvasContext.lineTo(x, ((canvasContext.canvas.height - height) / 2) + height);
                canvasContext.stroke();
            };

            return draw
        } catch (e) {
            return e
        }
    }



    return {
        setStream,
        setBlob
    }

}

const WaveForm = waveForm()
export { WaveForm }