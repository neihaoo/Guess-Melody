import {assert} from 'chai';
import {setGameTimer} from './set-game-timer';

describe(`Game Timer`, () => {
  it(`Must return correct time`, () => {
    assert.equal(setGameTimer(5).tick(), 4);
  });

  it(`Time must be of type number`, () => {
    assert.throws(() => setGameTimer(`five`).tick(), `Time must be of type number`);
  });

  it(`Time must be >= 0`, () => {
    assert.throws(() => setGameTimer(-1).tick(), `Time must be >= 0`);
  });
});
