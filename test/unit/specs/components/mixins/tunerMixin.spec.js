import Vue from 'vue'
import 'web-audio-test-api'
import tunerMixin from '@/components/mixins/tunerMixin'
import TunerAudioContext from '@/utils/TunerAudioContext/TunerAudioContext'

describe('Tuner mixin', () => {
  // Allow suspend and resume functionalities
  window.WebAudioTestAPI.setState({
    'AudioContext#suspend': 'enabled',
    'AudioContext#resume': 'enabled',
  })

  const TunerComponent = Vue.extend({ mixins: [tunerMixin] })
  let tc

  beforeEach(() => {
    tc = new TunerComponent()
  })

  it('has the right properties', () => {
    expect(tc.$data).toEqual({
      tuner: new TunerAudioContext(),
      distanceInCents: 0,
      nearestNote: '',
      isMicListening: false,
    })
  })

  describe('stopUpdatingNoteAndDistance method', () => {
    it('resets data properties', done => {
      tc.distanceInCents = 50
      tc.nearestNote = 'A'
      tc.$_tunerMixin_stopUpdatingNoteAndDistance()
      requestAnimationFrame(() => {
        expect(tc.distanceInCents).toEqual(0)
        expect(tc.nearestNote).toEqual('')
        done()
      })
    })
  })
})
