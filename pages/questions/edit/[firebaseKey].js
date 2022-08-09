import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getQuestions } from '../../../api/questionData';
import QuestionForm from '../../../components/form/QuestionForm';

export default function EditQuestion() {
  const [editQuestions, setEditQuestions] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getQuestions(firebaseKey).then(setEditQuestions);
  }, [firebaseKey]);
  return (
    <QuestionForm obj={editQuestions} />
  );
}
