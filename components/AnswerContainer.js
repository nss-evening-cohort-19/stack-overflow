import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useAuth } from '../utils/context/authContext';
import AnswerCard from './AnswerCard';
import { getAnswers } from '../api/answerData';

export default function AnswerContainer({ obj }) {
  const [, setAnswers] = useState({});
  // const { user } = useAuth();
  const getAllTheAnswers = async () => {
    await getAnswers(obj.uid).then(setAnswers);
  };
  // useEffect(() => {
  //   getAllTheAnswers();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user.uid]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {/* {answers && answers.answer && answers.answer.length && answers.answer.map((answer) => (<AnswerCard key={answer.firebaseKey} answerObj={answer} onUpdate={getAllTheAnswers} />
        ))} */}
        <AnswerCard key={obj.firebaseKey} answerObj={obj} onUpdate={getAllTheAnswers} />
      </div>
    </>
  );
}

AnswerContainer.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
