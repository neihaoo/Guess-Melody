import {assert} from 'chai';
import {setGameTimer} from './set-game-timer.js';

describe(`Game Timer`, () => {
  it(`Must return false if time equal 0`, () => {
    assert.equal(setGameTimer(0).tick(), false);
  });

  it(`Must return 4 if time equal 5`, () => {
    assert.equal(setGameTimer(5).tick(), 4);
  });
});
