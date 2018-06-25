import {setGameTimer} from '../game/set-game-timer';
import {changeScreen} from '../utils';
import {QuestionType} from '../data/game-data';
import GenreView from '../views/genre-view';
import ArtistView from '../views/artist-view';
import WinView from '../views/win-view';
import LoseView from '../views/lose-view';
import Application from '../application';
import ProgressView from '../views/progress-view';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.gameProgress = new ProgressView(this.model.gameState);
    this.view = this.getQuestionView(this.model.getCurrentQuestion());
    this.view.element.insertBefore(this.gameProgress.element, this.view.element.firstChild);
    this._interval = null;
  }

  get element() {
    return this.view.element;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  showNextQuestion() {
    this.model.nextQuestion();
    this.view = this.getQuestionView(this.model.getCurrentQuestion());
    this.view.element.insertBefore(this.gameProgress.element, this.view.element.firstChild);
    changeScreen(this.view.element);
    this.startGame();
  }

  getNextView() {
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
    this.getNextView();
  }

  getQuestionView(question) {
    let questionView;

    switch (question.type) {
      case QuestionType.ARTIST:
        questionView = new ArtistView(this.model.gameState, question);

        questionView.onReplayClick = () => {
          Application.showWelcome();
        };

        questionView.onAnswer = (answer) => {
          const userAnswer = answer === question.rightAnswer.artist;

          this.setAnswer(userAnswer);
        };

        break;
      case QuestionType.GENRE:
        questionView = new GenreView(this.model.gameState, question);

        questionView.onReplayClick = () => {
          Application.showWelcome();
        };

        questionView.onAnswer = (answers) => {
          const userAnswer = answers.every((el) => el === this.model.getCurrentQuestion().rightAnswer.genre);

          this.setAnswer(userAnswer);
        };

        break;
      default:
        throw new Error(`Unknown question type`);
    }

    return questionView;
  }

  updateGameProgress() {
    const gameProgress = new ProgressView(this.model.gameState);
    this.view.element.replaceChild(gameProgress.element, this.gameProgress.element);
    this.gameProgress = gameProgress;
  }

  startGame() {
    this._timer = setGameTimer(this.model.gameState.time);

    this._interval = setInterval(() => {
      this.model.updateTime(this._timer.tick());

      if (this.model.isDead()) {
        this.stopGame();
        Application.showResult(new LoseView(this.model.gameState));
      } else {
        this.updateGameProgress();
      }
    }, 1000);
  }
}
