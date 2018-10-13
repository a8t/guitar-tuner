import TunerAudioContext from '@/utils/tunerAudioContext/tunerAudioContext'
import 'web-audio-test-api'

describe('TunerAudioContext', () => {
  // Allow suspend and resume functionalities using a shim for Node
  window.WebAudioTestAPI.setState({
    'AudioContext#suspend': 'enabled',
    'AudioContext#resume': 'enabled',
  })
  describe('Instance methods', () => {
    let tac

    beforeEach(() => {
      tac = new TunerAudioContext()
    })

    describe('disconnectMicrophone', () => {
      it('works', () => {
        tac.isMicrophoneConnected = true
        tac.microphoneNode = tac.audioContext.createOscillator()
        tac.disconnectMicrophone()
        expect(tac.isMicrophoneConnected).toBe(false)
      })
    })

    describe('getDetectedFundamental', () => {
      it('works', () => {
        expect(tac.getDetectedFundamental()).toBe(NaN)
      })
    })
  })

  describe('Static methods', () => {
    describe('getPeakIndex', () => {
      it('works', () => {
        const freqArray = [0, 1, 0, 0]
        expect(TunerAudioContext.getPeakIndex(freqArray)).toBe(1)
      })
    })

    describe('getInferredPeakFreq', () => {
      it('works', () => {
        expect(TunerAudioContext.getInferredPeakFreq({ sampleRate: 2 }, 1, 1)).toBe(1)
      })
    })

    describe('toThreeDecimals', () => {
      it('works', () => {
        expect(TunerAudioContext.toThreeDecimals(440.123456)).toEqual(440.123)
      })
    })

    describe('nearestNoteFromFreq', () => {
      it('works', () => {
        const freq = 440
        expect(TunerAudioContext.nearestNoteFromFreq(freq)).toEqual(['A4', freq])
      })
    })

    describe('distanceInCents', () => {
      it('works', () => {
        expect(
          TunerAudioContext.distanceInCents({
            referenceFreq: 100,
            checkFreq: 200,
          }),
        ).toEqual(1200)
      })
    })
  })
})
