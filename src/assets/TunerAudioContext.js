import noteToPitchJSON from '../assets/noteToPitch.json';
import monkeypatch from '../assets/monkeypatch';

export default class TunerAudioContext {
  constructor() {
    // monkeypatch returns true if any of the patches had to be applied
    monkeypatch(window);

    this.audioContext = new AudioContext();

    this.filterNode = this.audioContext.createBiquadFilter();
    this.filterNode.type = 'lowpass';

    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 2048;
    try {
      // fftSize must be a power of 2. Not all browsers support higher than 2048 bins
      this.analyserNode.fftSize = 8192;
    } catch (error) {
      console.log(error);
    }

    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0;

    this.filterNode.connect(this.analyserNode);
    this.analyserNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);

    this.isMicrophoneConnected = false;
  }

  connectMicrophone() {
    this.audioContext.resume();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      stream => {
        this.isMicrophoneConnected = true;
        this.microphoneNode = this.audioContext.createMediaStreamSource(stream);
        this.microphoneNode.connect(this.filterNode);
      },
      // eslint-disable-next-line
      error => console.log(error)
    );
  }

  disconnectMicrophone() {
    if (this.microphoneNode && this.isMicrophoneConnected) {
      this.microphoneNode.disconnect();
      this.isMicrophoneConnected = false;
    }
    this.audioContext.suspend();
  }

  getDetectedFundamental() {
    const bins = this.analyserNode.frequencyBinCount;
    const freqDomain = new Float32Array(bins);
    this.analyserNode.getFloatFrequencyData(freqDomain);
    const indexOfPeak = TunerAudioContext.getPeakIndex(freqDomain);
    const inferredPeakIndex = TunerAudioContext.gaussianInterpolation(indexOfPeak, freqDomain);
    return TunerAudioContext.getInferredPeakFreq(
      this.audioContext,
      freqDomain.length,
      inferredPeakIndex
    );
  }

  static getPeakIndex(freqDomain) {
    return freqDomain.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
  }

  static gaussianInterpolation(indexOfPeak, frequencyDomainData) {
    const alpha = frequencyDomainData[indexOfPeak - 1];
    const beta = frequencyDomainData[indexOfPeak];
    const gamma = frequencyDomainData[indexOfPeak + 1];
    return indexOfPeak + (gamma - alpha) / (2 * (2 * beta - gamma - alpha));
  }

  static getInferredPeakFreq(audioContext, freqDomainLength, peakIndex) {
    const totalBins = freqDomainLength;
    const nyquist = audioContext.sampleRate / 2;
    const binSize = nyquist / totalBins;
    return TunerAudioContext.toThreeDecimals(peakIndex * binSize);
  }

  static toThreeDecimals(num) {
    return Math.round(num * 1e3) / 1e3;
  }

  static nearestNoteFromFreq(freq) {
    return Object.entries(noteToPitchJSON).reduce(
      (prev, curr) => (Math.abs(curr[1] - freq) < Math.abs(prev[1] - freq) ? curr : prev)
    );
  }

  static distanceInCents({ referenceFreq = 0, checkFreq = 0 }) {
    return 1200 * Math.log(checkFreq / referenceFreq) / Math.log(2);
  }
}
