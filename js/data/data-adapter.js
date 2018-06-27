import {QuestionType} from './game-data';

const convertAnswers = (question, answers) => {
  return answers.map((el) => {
    if (question.type === QuestionType.ARTIST) {
      el.image = el.image.url;
    }

    el.artist = el.title;

    return el;
  });
};

export const adaptServerData = (data) => {
  for (const question of data) {
    question.answers = convertAnswers(question, question.answers);
    question.rightAnswer = question.type === QuestionType.ARTIST ?
      Object.assign({}, question.answers.find((el) => el.isCorrect), {src: question.src}) :
      {genre: question.genre};
  }

  return data;
};
