import {setGameTimer} from '../game/set-game-timer';
import {getTimerIndicator} from '../game/get-timer-indicator';
import {changeScreen, splitTime} from '../utils';
import {QuestionType, TIMER_INDICATOR_RADIUS} from '../data/game-data';
import GenreView from '../views/genre-view';
import ArtistView from '../views/artist-view';
import WinView from '../views/win-view';
import LoseView from '../views/lose-view';
import Application from '../application';

const WARNING_TIME = 30;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.screen = this.getQuestionView();
    this._interval = null;
  }

  get element() {
    return this.screen.element;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  showNextQuestion() {
    this.model.nextQuestion();
    this.screen = this.getQuestionView();
    changeScreen(this.screen.element);
    this.startGame();
  }

  getNextScreen() {
    this.stopGame();

    if (this.model.isDead()) {
      Application.showResult(new LoseView(this.model.gameState));
    } else if (this.model.isWon()) {
      Application.showResult(new WinView(this.model.gameState));
    } else {
      this.showNextQuestion();
    }
  }

  setAnswer(answer) {
    const time = this.model.gameState.time;
    this.model.updateState({answerState: answer, answerTime: time});
    this.getNextScreen();
  }

  getQuestionView() {
    const question = this.model.getCurrentQuestion();
    let questionView;

    if (question.type === QuestionType.ARTIST) {
      questionView = new ArtistView(this.model.gameState, question);

      questionView.onReplayClick = () => {
        Application.showWelcome();
      };

      questionView.onAnswer = (answer) => {
        const userAnswer = answer === this.model.getCurrentQuestion().rightAnswer.artist;

        this.setAnswer(userAnswer);
      };
    } else if (question.type === QuestionType.GENRE) {
      questionView = new GenreView(this.model.gameState, question);

      questionView.onReplayClick = () => {
        Application.showWelcome();
      };

      questionView.onAnswer = (answers) => {
        const userAnswer = answers.every((el) => el === this.model.getCurrentQuestion().rightAnswer.genre);

        this.setAnswer(userAnswer);
      };
    }

    return questionView;
  }

  updateGameProgress() {
    const gameTimer = this.screen.element.querySelector(`.timer-value`);
    const gameTimerIndicator = this.screen.element.querySelector(`.timer-line`);

    if (this.model.gameState.time < WARNING_TIME) {
      gameTimer.classList.add(`timer-value--finished`);
    }

    gameTimer.querySelector(`.timer-value-mins`).textContent = `0${splitTime(this.model.gameState.time).minutes}`;
    gameTimer.querySelector(`.timer-value-secs`).textContent = splitTime(this.model.gameState.time).seconds;
    gameTimerIndicator.setAttribute(`stroke-dasharray`, getTimerIndicator(this.model.gameState.time, TIMER_INDICATOR_RADIUS).stroke);
    gameTimerIndicator.setAttribute(`stroke-dashoffset`, getTimerIndicator(this.model.gameState.time, TIMER_INDICATOR_RADIUS).offset);
  }

  startGame() {
    let swapTime = setGameTimer(this.model.gameState.time).tick().time;

    this._interval = setInterval(() => {
      setGameTimer(swapTime).tick();
      swapTime = setGameTimer(swapTime).tick().time;
      this.model.updateTime(swapTime);

      if (this.model.isDead()) {
        this.stopGame();
        Application.showResult(new LoseView(this.model.gameState));
      } else {
        this.updateGameProgress();
      }
    }, 1000);
  }
}
