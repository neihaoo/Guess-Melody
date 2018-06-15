import {assert} from 'chai';
import {calculateUserScore} from './calculate-user-score';

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
    assert.equal(calculateUserScore(answersInsufficient), false);
  });

  it(`Must return 10 if all answers are right and time > 30 seconds`, () => {
    const slowRightAnswers = generateUserAnswers(true, 35, 10);
    assert.deepEqual(calculateUserScore(slowRightAnswers), {userScore: 10, fastScore: 0});
  });

  it(`Must return 20 if all answers right and time < 30 seconds`, () => {
    const fastRightAnswers = generateUserAnswers(true, 15, 10);
    assert.deepEqual(calculateUserScore(fastRightAnswers), {userScore: 20, fastScore: 20});
  });

  it(`Must return 0 if all answers are wrong`, () => {
    const allAnswersWrong = generateUserAnswers(false, 15, 10);
    assert.deepEqual(calculateUserScore(allAnswersWrong), {userScore: 0, fastScore: 0});
  });

  it(`Time must be >= 0`, () => {
    const wrongAnswersTime = generateUserAnswers(true, -1, 10);
    assert.throws(() => calculateUserScore(wrongAnswersTime), `Time must be >= 0`);
  });
});
