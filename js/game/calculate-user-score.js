import {GameTime} from '../data/game-data';

const MINIMAL_ANSWERS_QUANTITY = 10;

const AnswerPoints = {
  RIGHT: 1,
  FAST: 2,
  WRONG: 2
};

export const calculateUserScore = (answers) => {
  let userScore = 0;
  let fastScore = 0;

  if (answers.length < MINIMAL_ANSWERS_QUANTITY) {
    return false;
  }

  for (const answer of answers) {
    if (answer.answerTime < 0) {
      throw new Error(`Time must be >= 0`);
    }

    if (answer.answerState) {
      userScore += answer.answerTime >= GameTime.FAST ? AnswerPoints.RIGHT :
        AnswerPoints.FAST;
      fastScore += answer.answerTime >= GameTime.FAST ? 0 : AnswerPoints.FAST;
    } else {
      userScore -= userScore > 0 ? AnswerPoints.WRONG : 0;
      fastScore -= fastScore > 0 ? AnswerPoints.WRONG : 0;
    }
  }

  return {userScore, fastScore};
};
