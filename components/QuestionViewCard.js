import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getSingleQuestions } from '../api/questionData';

export default function QuestionViewCard({ questionObj }) {
  getSingleQuestions(questionObj.firebaseKey);
  return (
    <Card style={{ width: '18rem', margin: '5px' }}>
      <Card.Body>
        <div>{questionObj.title}</div>
        <div>{questionObj.description}</div>
      </Card.Body>
    </Card>
  );
}

QuestionViewCard.propTypes = {
  questionObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
