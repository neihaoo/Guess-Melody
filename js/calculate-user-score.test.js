import {assert} from 'chai';
import {calculateUserScore} from './calculate-user-score.js';

const generateUserAnswers = (answer, time, answersCount) => {
  const answers = [];

  for (let i = 0; i < answersCount; i++) {
    answers.push({
      answerState: answer,
      answerTime: time
    });
  }

  return answers;
};

describe(`Calculate User Score`, () => {
  it(`Must return false if right answers < 10`, () => {
    const answersInsufficient = generateUserAnswers(true, 30, 3);
    assert.equal(calculateUserScore(answersInsufficient, 3), false);
  });

  it(`Must return 10 if all answers are right and time > 30 seconds`, () => {
    const slowRightAnswers = generateUserAnswers(true, 35, 10);
    assert.equal(calculateUserScore(slowRightAnswers, 3), 10);
  });

  it(`Must return 20 if all answers right and time < 30 seconds`, () => {
    const fastRightAnswers = generateUserAnswers(true, 15, 10);
    assert.equal(calculateUserScore(fastRightAnswers, 3), 20);
  });

  it(`Must return -20 if all answers are wrong`, () => {
    const allAnswersWrong = generateUserAnswers(false, 15, 10);
    assert.equal(calculateUserScore(allAnswersWrong, 3), -20);
  });

  it(`Time must be >= 0`, () => {
    const wrongAnswersTime = generateUserAnswers(true, -1, 10);
    assert.throws(() => calculateUserScore(wrongAnswersTime, 3), `Time must be >= 0`);
  });

  it(`Notes must be >= 0`, () => {
    const userAnswers = generateUserAnswers(true, 25, 10);
    assert.throws(() => calculateUserScore(userAnswers, -1), `Notes must be >= 0`);
  });
});
