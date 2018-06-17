import assert from 'assert';
import {getTimerIndicator} from './get-timer-indicator';

describe(`Timer indicator`, () => {
  describe(`Stroke value`, () => {
    it(`Must return full length in initial state`, () => {
      assert.equal(getTimerIndicator(300, 100).stroke, 628);
    });
  });

  describe(`Offset value`, () => {
    it(`Must return offset = 0 in initial state`, () => {
      assert.equal(getTimerIndicator(300, 100).offset, 0);
    });

    it(`Must return offset = length in the final state`, () => {
      assert.equal(getTimerIndicator(0, 100).offset, 628);
    });

    it(`Must return offset = half length on a half`, () => {
      assert.equal(getTimerIndicator(150, 100).offset, 314);
    });
  });
});
