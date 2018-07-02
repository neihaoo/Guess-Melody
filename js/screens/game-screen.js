import {GameTime, QuestionType} from '../data/game-data';
import {changeScreen} from '../utils';
import {setGameTimer} from '../game/set-game-timer';
import Application from '../application';
import GenreView from '../views/genre-view';
import ArtistView from '../views/artist-view';
import WinView from '../views/win-view';
import LoseView from '../views/lose-view';
import ConfirmView from '../views/confirm-view';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.view = this._getQuestionView(this.model.getCurrentQuestion());
    this.modalView = new ConfirmView();
    this._interval = null;
  }

  get element() {
    return this.view.element;
  }

  startGame() {
    this._timer = setGameTimer(this.model.gameState.time);

    this._interval = setInterval(() => {
      this.model.updateTime(this._timer.tick());

      if (this.model.isDead()) {
        this._stopGame();
        Application.showResult(new LoseView(this.model.gameState));
      } else {
        this.view.updateProgress(this.model.gameState);
      }
    }, GameTime.STEP);
  }

  _stopGame() {
    clearInterval(this._interval);
  }

  _getQuestionView(question) {
    let questionView;

    switch (question.type) {
      case QuestionType.ARTIST:
        questionView = new ArtistView(this.model.gameState, question);

        if (this.model.gameState.debugMode) {
          questionView.showAnswer();
        }

        questionView.onReplayClick = () => {
          this._showModal();
        };

        questionView.onAnswer = (answer) => {
          const userAnswer = answer === question.rightAnswer.artist;

          this._setAnswer(userAnswer);
        };

        break;
      case QuestionType.GENRE:
        questionView = new GenreView(this.model.gameState, question);

        if (this.model.gameState.debugMode) {
          questionView.showAnswer();
        }

        questionView.onReplayClick = () => {
          this._showModal();
        };

        questionView.onAnswer = (answers) => {
          const userAnswer = answers.every((el) => el === this.model.getCurrentQuestion().rightAnswer.genre);

          this._setAnswer(userAnswer);
        };

        break;
      default:
        throw new Error(`Unknown question type`);
    }

    return questionView;
  }

  _showNextQuestion() {
    this.model.nextQuestion();
    this.view = this._getQuestionView(this.model.getCurrentQuestion());
    changeScreen(this.view.element);
    this.startGame();
  }

  _getNextView() {
    this._stopGame();

    if (this.model.isDead()) {
      Application.showResult(new LoseView(this.model.gameState));
    } else if (this.model.isWon()) {
      Application.showResult(new WinView(this.model.gameState));
    } else {
      this._showNextQuestion();
    }
  }

  _setAnswer(answer) {
    const time = this.model.gameState.time;
    this.model.updateState({answerState: answer, answerTime: time});
    this._getNextView();
  }

  _showModal() {
    this.modalView.showModal();
    this.modalView.onConfirmClick = () => {
      this._stopGame();
      Application.launch();
      ConfirmView.closeModal();
    };
    this.modalView.onCloseClick = () => {
      ConfirmView.closeModal();
    };
  }
}
