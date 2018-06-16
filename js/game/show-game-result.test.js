import {assert} from 'chai';
import {showGameResult} from './show-game-result';

const playersTotalResults = [
  {
    score: 11,
    notes: 2,
    time: 2
  },
  {
    score: 4,
    notes: 2,
    time: 1
  },
  {
    score: 8,
    notes: 1,
    time: 3
  },
  {
    score: 5,
    notes: 1,
    time: 2
  }
];

const createUserTotalResult = (userScore, userNotes, userTime) => ({
  score: userScore,
  notes: userNotes,
  time: userTime
});

describe(`Show Game Result`, () => {
  it(`Must return Время вышло!<br>Вы не успели отгадать все мелодии`, () => {
    const userTimeOverResult = createUserTotalResult(10, 3, 0);
    assert.equal(showGameResult(playersTotalResults, userTimeOverResult), `Время вышло!<br>Вы не успели отгадать все мелодии`);
  });

  it(`Must return У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`, () => {
    const userNotesOverResult = createUserTotalResult(10, 0, 5);
    assert.equal(showGameResult(playersTotalResults, userNotesOverResult), `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`);
  });

  it(`Must return Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`, () => {
    const userTotalResult = createUserTotalResult(10, 3, 4);
    assert.equal(showGameResult(playersTotalResults, userTotalResult), `Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`);
  });
});
