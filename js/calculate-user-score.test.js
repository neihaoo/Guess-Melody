import {assert} from 'chai';
import {calculateUserScore} from './calculate-user-score.js';

const createUserAnswer = (answer, time) => ({
  answerState: answer,
  answerTime: time
});

const generateUserAnswers = (answer, answersCount) => {
  const answers = [];

  for (let i = 0; i < answersCount; i++) {
    answers.push(answer);
  }

  return answers;
};

describe(`Calculate User Score`, () => {
  it(`Must return false if right answers < 10`, () => {
    assert.equal(calculateUserScore(generateUserAnswers(createUserAnswer(true, 30), 3), 3), false);
  });

  it(`Must return 10 if all answers are right and time > 30 seconds`, () => {
    assert.equal(calculateUserScore(generateUserAnswers(createUserAnswer(true, 35), 10), 3), 10);
  });

  it(`Must return 20 if all answers right and time < 30 seconds`, () => {
    assert.equal(calculateUserScore(generateUserAnswers(createUserAnswer(true, 15), 10), 3), 20);
  });

  it(`Must return -20 if all answers are wrong`, () => {
    assert.equal(calculateUserScore(generateUserAnswers(createUserAnswer(false, 15), 10), 3), -20);
  });

  it(`Time mustn't be < 0`, () => {
    assert.throws(() => calculateUserScore(generateUserAnswers(createUserAnswer(true, -1), 10), 3), `Time must be >= 0`);
  });

  it(`Notes mustn't be < 0`, () => {
    assert.throws(() => calculateUserScore(generateUserAnswers(createUserAnswer(true, 25), 10), -1), `Notes must be >= 0`);
  });
});
