import gameData from './game-melody';

const MINIMAL_ANSWERS_QUANTITY = 10;
const GAME_NOTES = 3;
const TIMER_INDICATOR_RADIUS = 370;

const AnswersCount = {
  ARTIST: 3,
  GENRE: 4
};

const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const GameTime = {
  FAST: 30,
  LIMIT: 300
};

const gameStats = [];

const shuffle = (arr) => {
  for (let i = arr.length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [arr[i - 1], arr[randomIndex]] = [arr[randomIndex], arr[i - 1]];
  }

  return arr;
};

const generateQuestionsList = (data, gameQuestionsLimit) => {
  const questionsList = [];

  for (let i = 0; i < gameQuestionsLimit; i++) {
    const type = Math.round(Math.random()) ? QuestionType.ARTIST : QuestionType.GENRE;
    const answers = shuffle(data)
      .slice(0, type === QuestionType.ARTIST ? AnswersCount.ARTIST : AnswersCount.GENRE);
    const rightAnswer = answers[Math.floor(Math.random() * answers.length)];

    questionsList.push({
      type,
      answers,
      rightAnswer
    });
  }

  return questionsList;
};

const INITIAL_STATE = Object.freeze({
  time: GameTime.LIMIT,
  notes: GAME_NOTES,
  userScore: [],
  questions: generateQuestionsList(gameData, MINIMAL_ANSWERS_QUANTITY),
  currentQuestion: 0
});

export {QuestionType, MINIMAL_ANSWERS_QUANTITY, GameTime, GAME_NOTES, INITIAL_STATE, gameStats, TIMER_INDICATOR_RADIUS};
