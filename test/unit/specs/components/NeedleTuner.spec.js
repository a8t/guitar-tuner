import Vue from 'vue'
import 'web-audio-test-api'
import NeedleTuner from '@/components/Tuner/TunerDisplayNeedle'

describe('Needle tuner', () => {
  // Allow suspend and resume functionalities
  window.WebAudioTestAPI.setState({
    'AudioContext#suspend': 'enabled',
    'AudioContext#resume': 'enabled',
  })

  describe('Instance tests', () => {
    const nt = new Vue(NeedleTuner).$mount()
    it('computes needleTransform correctly', () => {
      nt.distanceInCents = 50
      expect(nt.needleTransform).toBe('rotate(90 103.93 105.53)')
    })
  })
})
