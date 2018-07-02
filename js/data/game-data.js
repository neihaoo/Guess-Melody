const GAME_NOTES = 3;

const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const GameTime = {
  FAST: 30,
  LIMIT: 300,
  WARNING: 30,
  STEP: 1000
};

const INITIAL_STATE = Object.freeze({
  time: GameTime.LIMIT,
  notes: GAME_NOTES,
  userScores: [],
  questions: [],
  currentQuestion: 0
});

export {
  QuestionType,
  GameTime,
  GAME_NOTES,
  INITIAL_STATE
};
