import { getSingleAnswer, deleteAnswer } from './answerData';
import { getSingleQuestions, deleteQuestions, getQuestionAnswers } from './questionData';

const viewAnswerDetails = (answerFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAnswer(answerFirebaseKey)
    .then((answerObj) => {
      getSingleQuestions(answerObj.questionId)
        .then((questionObj) => {
          resolve({ questionObj, ...answerObj });
        });
    }).catch((error) => reject(error));
});

const viewQuestionDetails = (questionFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleQuestions(questionFirebaseKey), getQuestionAnswers(questionFirebaseKey)])
    .then(([questionObj, quetionAnswersArray]) => {
      resolve({ ...questionObj, answers: quetionAnswersArray });
    }).catch((error) => reject(error));
});

const deleteQuestionAnswers = (questionId) => new Promise((resolve, reject) => {
  getQuestionAnswers(questionId).then((answerArray) => {
    console.warn(answerArray, 'Question Answers');
    const deleteBookPromises = answerArray.map((answer) => deleteAnswer(answer.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteQuestions(questionId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewAnswerDetails, viewQuestionDetails, deleteQuestionAnswers };
