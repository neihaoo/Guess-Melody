import assert from 'assert';
import {getTimerIndicator} from './get-timer-indicator';

describe(`Timer indicator`, () => {
  it(`Must return full length and 0 in initial state`, () => {
    assert.equal(getTimerIndicator(300, 100).stroke, 628);
    assert.equal(getTimerIndicator(300, 100).offset, 0);
  });

  it(`Must return 0 and full length in the final state`, () => {
    assert.equal(getTimerIndicator(0, 100).stroke, 628);
    assert.equal(getTimerIndicator(0, 100).offset, 628);
  });

  it(`Offset and length must be equal on a half`, () => {
    assert.equal(getTimerIndicator(150, 100).stroke, 628);
    assert.equal(getTimerIndicator(150, 100).offset, 314);
  });
});
