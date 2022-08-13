import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getAnswersForTheQuestion } from '../api/answerData';

export default function AnswerCard({ answerObj }) {
  getAnswersForTheQuestion(answerObj.firebaseKey);
  return (
    <Card style={{ width: '18rem', margin: '5px' }}>
      <Card.Body>
        <div>{answerObj.description}</div>
      </Card.Body>
    </Card>
  );
}

AnswerCard.propTypes = {
  answerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
