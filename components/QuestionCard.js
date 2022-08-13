import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import firebase from 'firebase/app';
import 'firebase/auth';
import { deleteQuestions } from '../api/questionData';

export default function QuestionCard({ questionObj, onUpdate }) {
  const { uid } = firebase.auth().currentUser;
  const deleteThisQuestion = () => {
    if (window.confirm(`Delete ${questionObj.title}?`)) {
      deleteQuestions(questionObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '55rem', margin: '10px' }}>
      <Card.Body>
        <h5>
          <a href={`/questions/${questionObj?.firebaseKey}`}>{questionObj.title}</a>
        </h5>

        <p className="card-text">{questionObj.description}</p>
        {uid === questionObj.uid ? (
          <>
            <Link href={`/questions/edit/${questionObj.firebaseKey}`} passHref>
              <Button variant="outline-info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisQuestion} className="m-2">DELETE</Button>
          </>
        ) : null}

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
