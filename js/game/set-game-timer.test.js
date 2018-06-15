import {assert} from 'chai';
import {setGameTimer} from './set-game-timer';

describe(`Game Timer`, () => {
  it(`Must return correct time`, () => {
    assert.equal(setGameTimer(5).tick().time, 4);
    assert.equal(setGameTimer(5).tick().tick().tick().time, 2);
  });

  it(`Time must be of type number`, () => {
    assert.throws(() => setGameTimer(`five`).tick().time, `Time must be of type number`);
  });

  it(`Time must be >= 0`, () => {
    assert.throws(() => setGameTimer(-1).tick().time, `Time must be >= 0`);
  });
});
