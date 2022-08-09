import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET QUESTION
const getQuestions = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/questions.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
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

// UPDATE QUESTIONS
const updateQuestions = (questionObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/questions/${questionObj.firebaseKey}.json`, questionObj)
    .then(() => getQuestions().then(resolve))
    .catch(reject);
});

export {
  createQuestions,
  getQuestions,
  updateQuestions,
};
