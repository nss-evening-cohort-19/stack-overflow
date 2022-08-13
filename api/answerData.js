import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// Get Answer
const getAnswers = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/answers/${firebaseKey}.json`)
    .then((response) => {
      console.log('data ===', response.data);
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

// Add Answer
const addAnswer = (answerObj, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/answers.json`, answerObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/answers/${response.data.name}.json`, payload).then(() => {
        getAnswers(uid).then(resolve);
      });
    }).catch(reject);
});

const updateAnswer = (answerObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/answers/${answerObj.firebaseKey}.json`, answerObj)
    .then(() => getAnswers(answerObj?.firebaseKey))
    .then(resolve)
    .catch(reject);
});

// Delete Answer
const deleteAnswer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/answers/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getAnswers,
  addAnswer,
  deleteAnswer,
  updateAnswer,
};
