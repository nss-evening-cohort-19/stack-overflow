import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteQuestions } from '../api/questionData';

export default function QuestionCard({ questionObj, onUpdate }) {
  const deleteThisQuestion = () => {
    if (window.confirm(`Delete ${questionObj.title}?`)) {
      deleteQuestions(questionObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{questionObj.title}</Card.Title>
        <p className="card-text">{questionObj.description}</p>
        <Link href={`/questions/edit/${questionObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisQuestion} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

QuestionCard.propTypes = {
  questionObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
