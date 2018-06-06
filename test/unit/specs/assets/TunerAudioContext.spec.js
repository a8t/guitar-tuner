import TunerAudioContext from '@/assets/TunerAudioContext';

describe('TunerAudioContext', () => {
  describe('getPeakIndex', () => {
    test('works', () => {
      const freqArray = [0, 1, 0, 0];
      expect(TunerAudioContext.getPeakIndex(freqArray)).toBe(1);
    });
  });
  describe('getInferredPeakFreq', () => {
    test('works', () => {
      const freqArray = [0, 1, 0, 0];
      expect(TunerAudioContext.getInferredPeakFreq({sampleRate: 2}, 1, 1)).toBe(
        1,
      );
    });
  });
  describe('nearestNoteFromFreq', () => {
    test('works', () => {
      const freq = 440;
      expect(TunerAudioContext.nearestNoteFromFreq(440)).toEqual(['A4', 440]);
    });
  });
});
