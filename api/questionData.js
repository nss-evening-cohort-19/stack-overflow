/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET QUESTION
const getQuestions = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/questions.json?`)
    .then((response) => {
      if (response.data) {
        console.warn('getQuestions response.data ===', response.data);
        axios.get(`${dbUrl}/questions.json?`)
          // eslint-disable-next-line no-shadow
          .then((response) => {
            if (response.data) {
              // eslint-disable-next-line no-console
              console.log('getQuestions response.data===', response.data);
              resolve(Object.values(response.data));
            } else {
              resolve([]);
            }
          })
          .catch((error) => reject(error));
      }
    });
});

// GET SINGLE QUESTION
const getSingleQuestions = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/questions/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// CREATE QUESTION
const createQuestions = (questionObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/questions.json`, questionObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/questions/${response.data.name}.json`, payload)
        .then(() => {
          getQuestions().then(resolve);
        });
    })
    .catch(reject);
});

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getQuestionAnswers = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/questions.json?orderBy="questionId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// UPDATE QUESTIONS
const updateQuestions = (questionObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/questions/${questionObj.firebaseKey}.json`, questionObj)
    .then(() => getQuestions().then(resolve))
    .catch(reject);
});

// DELETE QUESTIONS
const deleteQuestions = (firebaseKey) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbUrl}/questions/${firebaseKey}.json`)
      .then(() => {
        getQuestions(firebaseKey).then((questionsArray) => resolve(questionsArray));
      })
      .catch((error) => reject(error));
  });

export {
  createQuestions,
  getQuestions,
  updateQuestions,
  deleteQuestions,
  getSingleQuestions,
  getQuestionAnswers,
};
