const MINIMAL_ANSWERS_QUANTITY = 10;
const FAST_ANSWER_TIME = 30;

const AnswerPoints = {
  RIGHT: 1,
  FAST: 2,
  WRONG: 2
};

export const calculateUserScore = (answers, notes) => {
  let userScore = 0;

  if (answers.length < MINIMAL_ANSWERS_QUANTITY) {
    return false;
  }

  answers.forEach((el) => {
    if (el.answerState) {
      userScore += el.answerTime >= FAST_ANSWER_TIME ? AnswerPoints.RIGHT :
        AnswerPoints.FAST;
    } else {
      userScore -= AnswerPoints.WRONG;
    }

    if (el.answerTime < 0) {
      throw new Error(`Time must be >= 0`);
    }

    if (notes < 0) {
      throw new Error(`Notes must be >= 0`);
    }
  });

  return userScore;
};
