import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getQuestions } from '../api/questionData';
import AnswerCard from './AnswerCard';

function AnswerContainer() {
  const [answers, setAnswers] = useState([]);
  const { user } = useAuth();
  const getAllTheAnswers = () => {
    getQuestions(user.uid).then(setAnswers);
  };
  useEffect(() => {
    getAllTheAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap">
        {answers.map((answer) => (
          <AnswerCard key={answer.firebaseKey} questionObj={answer} onUpdate={getAllTheAnswers} />
        ))}
      </div>
    </>
  );
}
export default AnswerContainer;
