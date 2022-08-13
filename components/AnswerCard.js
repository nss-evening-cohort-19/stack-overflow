import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getAnswers } from '../api/answerData';

export default function AnswerCard({ answerObj }) {

  const [viewAnswer, setViewAnswer] = useState({});
  const { firebaseKey } = answerObj;

  // make a call to the API to get the author data
  useEffect(() => {
    getAnswers(firebaseKey).then(setViewAnswer);
  }, [firebaseKey]);


  // getAnswersForTheQuestion(answerObj.firebaseKey);

  return (
    <div>
      {viewAnswer && viewAnswer.answer && viewAnswer.answer.map((answer, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Card key={idx} style={{ width: '18rem', margin: '5px' }}>
          <Card.Body>
            <div>{answer}</div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

AnswerCard.propTypes = {
  answerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
