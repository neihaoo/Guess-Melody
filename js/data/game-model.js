import {INITIAL_STATE} from './game-data';

const getQuestion = (gameState) => gameState.questions[gameState.currentQuestion];

export default class GameModel {
  constructor() {
    this.restartGame();
  }

  get gameState() {
    return this._gameState;
  }

  isDead() {
    return this._gameState.notes === 0 || this._gameState.time === 0;
  }

  isWon() {
    return this._gameState.currentQuestion === this._gameState.questions.length - 1;
  }

  nextQuestion() {
    this._gameState.currentQuestion += 1;
  }

  restartGame() {
    this._gameState = INITIAL_STATE;
  }

  updateState(answer) {
    const userScore = [...this._gameState.userScore];
    this._gameState.userScore.push(answer);
    const notes = answer.answerState ? this._gameState.notes : this._gameState.notes - 1;
    this._gameState = Object.assign({}, this._gameState, {userScore, notes});
  }

  getCurrentQuestion() {
    return getQuestion(this._gameState);
  }

  updateTime(time) {
    this._gameState = Object.assign({}, this._gameState, {time});
  }
}
