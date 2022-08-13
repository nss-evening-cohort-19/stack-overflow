import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getSingleQuestions } from '../api/questionData';

export default function QuestionViewCard({ questionObj }) {
  getSingleQuestions(questionObj.firebaseKey);
  return (
    <Card style={{ width: '55rem', margin: '5px' }}>
      <Card.Body>
        <div>
          <h3>{questionObj.title}</h3>
        </div>
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
