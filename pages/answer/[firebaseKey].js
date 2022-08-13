import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AnswerContainer from '../../components/AnswerContainer';
import { getAnswers } from '../../api/answerData';

export default function ViewAnswer() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [viewAnswer, setViewAnswer] = useState({});

  // make a call to the API to get the author data
  useEffect(() => {
    getAnswers(firebaseKey).then(setViewAnswer);
  }, [firebaseKey]);

  return (
    <AnswerContainer obj={viewAnswer} />
  );
}
