import { Constants } from "./constants";
import { Logger } from "./logger";


class BaseWaveForm {
    public canvasId: string = Constants.canvasId;
    public color: string = '#969696';

    constructor() {
        window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;

        window.requestAnimationFrame = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame ||
            (window as any).webkitRequestAnimationFrame || (window as any).msRequestAnimationFrame;

        window.cancelAnimationFrame = window.cancelAnimationFrame || (window as any).mozCancelAnimationFrame;

        const el = document.querySelector('.react-voice-recorder')
        if (el)
            this.color = getComputedStyle(el).getPropertyValue('--grey-color')
    }

    public get getAudioContext() {
        return new AudioContext()
    }
}

export class WaveFormFromStream extends BaseWaveForm {

    private requestAnimationFrameID: number | null = null;
    private audioContext: AudioContext;
    private analyser: AnalyserNode;
    private mediaStreamSource: MediaStreamAudioSourceNode;
    private bufferLength: number;
    private dataArray: Uint8Array;

    constructor(stream: MediaStream) {
        super()

        this.audioContext = this.getAudioContext;
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream)
        this.mediaStreamSource.connect(this.analyser)
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    private drawVisualizer(): void {

        this.requestAnimationFrameID = null;

        this.analyser.getByteFrequencyData(this.dataArray);

        const canvas: HTMLCanvasElement | null = document.querySelector(this.canvasId)
        if (canvas === null) return

        const width = canvas.width;
        const height = canvas.height;
        const barWidth = 8;

        const canvasContext = canvas.getContext('2d');
        if (canvasContext === null) return

        canvasContext.clearRect(0, 0, width, height);
        let x = 0;

        this.dataArray.forEach((item, index, array) => {
            const heightItem = item / 255 * height;
            canvasContext.strokeStyle = this.color;
            x = x + barWidth;
            canvasContext.beginPath();
            canvasContext.lineCap = "round";
            canvasContext.lineWidth = 5;
            canvasContext.moveTo(x, (height - heightItem) / 2);
            canvasContext.lineTo(x, ((height - heightItem) / 2) + heightItem);
            canvasContext.stroke();
        })

        this.startVisualizer()
    }

    public stopVisualizer(): void {
        if (this.requestAnimationFrameID !== null) {
            cancelAnimationFrame(this.requestAnimationFrameID)
            this.requestAnimationFrameID = null;
        }
    }

    public startVisualizer(): void {
        if (this.requestAnimationFrameID === null) {
            this.requestAnimationFrameID = requestAnimationFrame(this.drawVisualizer.bind(this))
        }

    }

}

export class WaveFormFromBlob extends BaseWaveForm {
    private audioContext: AudioContext;
    private arraybuffer: ArrayBuffer | null = null;
    private audioBuffer: AudioBuffer | null = null;
    private normalizedData: number[] = [];

    constructor() {
        super()
        this.audioContext = this.getAudioContext;
    }

    public async setBlobFile(file: Blob) {
        this.arraybuffer = await file.arrayBuffer()
        this.audioBuffer = await this.audioContext.decodeAudioData(this.arraybuffer)
        return this
    }

    public draw() {

        if (this.audioBuffer === null) {
            Logger.error('First Set Blob File');
            return;
        }

        this.normalizedData = this.normalizeData(this.filterData(this.audioBuffer));
        const canvas: HTMLCanvasElement | null = document.querySelector(this.canvasId);
        if (canvas === null) return

        const ctx = canvas.getContext("2d");
        if (ctx === null) return

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let x = 0
        for (let i = 0; i < this.normalizedData.length; i++) {
            x += 9.9;
            let height = (this.normalizedData[i] >= 1 ? 0.98 : (this.normalizedData[i] <= 0 ? 0.02 : this.normalizedData[i])) * canvas.height;

            this.drawLineSegment(ctx, x, height);
        }
    };

    private filterData(audioBuffer: AudioBuffer): number[] {
        const rawData = audioBuffer.getChannelData(0);
        const samples = 30;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i;
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(rawData[blockStart + j])
            }
            filteredData.push(sum / blockSize);
        }
        return filteredData;
    }

    private normalizeData(filteredData: number[]): number[] {
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        return filteredData.map(n => n * multiplier);
    }

    private drawLineSegment(canvasContext: CanvasRenderingContext2D, x: number, height: number): void {
        canvasContext.lineWidth = 5;

        canvasContext.strokeStyle = this.color;
        canvasContext.beginPath();
        canvasContext.lineCap = "round";

        canvasContext.moveTo(x, (canvasContext.canvas.height - height) / 2);
        canvasContext.lineTo(x, ((canvasContext.canvas.height - height) / 2) + height);
        canvasContext.stroke();
    };

}