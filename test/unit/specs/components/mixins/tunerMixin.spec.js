import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import tunerMixin from '@/components/mixins/tunerMixin';
import TunerAudioContext from '@/assets/TunerAudioContext';

describe('Tuner mixin', () => {
  beforeEach(() => {
    const localVue = createLocalVue();
    const TunerComponent = Vue.extend({ mixins: [tunerMixin] });
  });
  test('properties work', () => {
    expect(tunerMixin.data()).toEqual({
      tuner: new TunerAudioContext(),
      distanceInCents: 0,
      nearestNote: '',
      isMicListening: false,
    });
  });
  test('properties work', () => {
    tunerMixin.methods.updateNoteAndDistance();
  });
});
