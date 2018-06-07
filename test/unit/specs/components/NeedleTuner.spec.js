import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import 'web-audio-test-api';
import tunerMixin from '@/components/mixins/tunerMixin';
import TunerAudioContext from '@/assets/TunerAudioContext';
import NeedleTuner from '@/components/NeedleTuner.vue';

describe('Needle tuner', () => {
  // Suppress console.log
  console.log = jest.fn();

  // Allow suspend and resume functionalities
  WebAudioTestAPI.setState({
    'AudioContext#suspend': 'enabled',
    'AudioContext#resume': 'enabled',
  });

  it('has one mixin', () => {
    expect(NeedleTuner.mixins.length).toBe(1);
  });

  describe('Instance tests', () => {
    const nt = new Vue(NeedleTuner).$mount();
    it('computes needleTransform correctly', () => {
      nt.distanceInCents = 50;
      expect(nt.needleTransform).toBe('rotate(50 179.24 201.58)');
    });
  });
});
