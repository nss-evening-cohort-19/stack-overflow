import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QuestionViewCard from '../../components/QuestionViewCard';
import AnswerForm from '../../components/form/AnswerForm';
import { getAnswers } from '../../api/answerData';
import AnswerContainer from '../../components/AnswerContainer';

export default function ViewAnswerCard() {
  const [viewAnswer, setViewAnswer] = useState({});

  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the author data
  useEffect(() => {
    getAnswers(firebaseKey).then(setViewAnswer);
  }, [firebaseKey]);

  // pass object to form
  return (
    <>
      <QuestionViewCard questionObj={viewAnswer} />
      <AnswerContainer obj={viewAnswer} />
      <AnswerForm obj={viewAnswer} />
    </>

  );
}
