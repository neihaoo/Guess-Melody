import {assert} from 'chai';
import {setGameTimer} from './set-game-timer.js';

describe(`Game Timer`, () => {
  it(`Must return 4 if time equal 5`, () => {
    assert.equal(setGameTimer(5).tick().time, 4);
  });

  it(`Must return 2 if time equal 5`, () => {
    assert.equal(setGameTimer(5).tick().tick().tick().time, 2);
  });

  it(`Time must be of type number`, () => {
    assert.throws(() => setGameTimer(`five`).tick().time, `Time must be of type number`);
  });

  it(`Time must be >= 0`, () => {
    assert.throws(() => setGameTimer(-1).tick().time, `Time must be >= 0`);
  });
});
